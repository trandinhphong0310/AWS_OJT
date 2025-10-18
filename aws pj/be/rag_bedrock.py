import boto3
import json
import uuid
from langchain_community.document_loaders import PyPDFLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain.schema import Document
import numpy as np

class BedrockRAG:
    def __init__(self):
        self.bedrock_runtime = boto3.client('bedrock-runtime', region_name='us-east-1')
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200
        )
    
    def get_titan_embedding(self, text):
        """Lấy embedding từ Amazon Titan (FREE)"""
        try:
            body = json.dumps({
                "inputText": text
            })
            
            response = self.bedrock_runtime.invoke_model(
                modelId='amazon.titan-embed-text-v1',
                body=body
            )
            
            response_body = json.loads(response['body'].read())
            return response_body['embedding']
            
        except Exception as e:
            print(f"Embedding error: {e}")
            return None
    
    def invoke_claude(self, prompt, max_tokens=1000):
        """Gọi Claude cho generation"""
        try:
            body = json.dumps({
                "prompt": f"\n\nHuman: {prompt}\n\nAssistant:",
                "max_tokens_to_sample": max_tokens,
                "temperature": 0.7,
                "top_p": 0.9,
            })
            
            response = self.bedrock_runtime.invoke_model(
                modelId='anthropic.claude-instant-v1',
                body=body
            )
            
            response_body = json.loads(response['body'].read())
            return response_body['completion']
            
        except Exception as e:
            print(f"Claude error: {e}")
            return None
    
    def invoke_titan(self, prompt, max_tokens=1000):
        """Gọi Amazon Titan cho generation (FREE)"""
        try:
            body = json.dumps({
                "inputText": prompt,
                "textGenerationConfig": {
                    "maxTokenCount": max_tokens,
                    "temperature": 0.7,
                    "topP": 0.9,
                }
            })
            
            response = self.bedrock_runtime.invoke_model(
                modelId='amazon.titan-text-lite-v1',
                body=body
            )
            
            response_body = json.loads(response['body'].read())
            return response_body['results'][0]['outputText']
            
        except Exception as e:
            print(f"Titan error: {e}")
            return None
    
    def load_and_split_document(self, file_path):
        """Load và chia nhỏ document"""
        print(f"📖 Loading document: {file_path}")
        
        if file_path.lower().endswith('.pdf'):
            loader = PyPDFLoader(file_path)
        else:
            loader = TextLoader(file_path, encoding='utf-8')
        
        docs = loader.load()
        chunks = self.text_splitter.split_documents(docs)
        print(f"📄 Split into {len(chunks)} chunks")
        return chunks
    
    def create_vector_store(self, chunks):
        """Tạo vector store với Titan embeddings"""
        print("🔄 Creating vector store với Titan embeddings...")
        
        # Lấy embeddings cho mỗi chunk
        texts = [chunk.page_content for chunk in chunks]
        embeddings = []
        
        for i, text in enumerate(texts):
            if i % 5 == 0:  # Log progress every 5 chunks
                print(f"📊 Processing chunk {i+1}/{len(texts)}")
            
            embedding = self.get_titan_embedding(text)
            if embedding:
                embeddings.append(embedding)
            else:
                # Fallback: zero vector
                embeddings.append([0] * 1536)
        
        # Tạo FAISS index
        import faiss
        dimension = len(embeddings[0]) if embeddings else 1536
        index = faiss.IndexFlatL2(dimension)
        
        if embeddings:
            index.add(np.array(embeddings))
        
        return {
            'index': index,
            'chunks': chunks,
            'texts': texts,
            'embeddings': embeddings
        }
    
    def similarity_search(self, vector_store, query, k=3):
        """Tìm các chunk liên quan nhất"""
        # Lấy embedding cho query
        query_embedding = self.get_titan_embedding(query)
        if not query_embedding:
            return []
        
        # Tìm kiếm similarity
        distances, indices = vector_store['index'].search(
            np.array([query_embedding]), k
        )
        
        # Lấy các chunk liên quan
        relevant_chunks = []
        for idx in indices[0]:
            if idx < len(vector_store['chunks']):
                relevant_chunks.append(vector_store['chunks'][idx])
        
        return relevant_chunks
    
    def answer_question(self, vector_store, question):
        """Trả lời câu hỏi dựa trên RAG"""
        print(f"🔍 Searching for relevant content...")
        
        # Tìm các chunk liên quan
        relevant_chunks = self.similarity_search(vector_store, question, k=3)
        
        if not relevant_chunks:
            return "Không tìm thấy thông tin liên quan trong tài liệu."
        
        # Xây dựng context
        context = "\n\n".join([
            f"Đoạn {i+1}: {chunk.page_content}" 
            for i, chunk in enumerate(relevant_chunks)
        ])
        
        # Tạo prompt cho RAG
        prompt = f"""
        Hãy đọc kỹ các đoạn văn bản sau từ tài liệu:

        {context}

        Dựa TRÊN các đoạn văn bản trên, hãy trả lời câu hỏi sau:
        Câu hỏi: {question}

        Yêu cầu:
        - Chỉ sử dụng thông tin từ các đoạn văn bản trên
        - Nếu không đủ thông tin, hãy nói rõ
        - Trả lời bằng tiếng Việt, rõ ràng và chi tiết

        Trả lời:
        """
        
        print("🤖 Generating answer with Bedrock...")
        
        # Dùng Claude hoặc Titan để generate
        answer = self.invoke_claude(prompt)
        if not answer:
            answer = self.invoke_titan(prompt)
        
        return answer or "Không thể tạo câu trả lời."

# Global instance
bedrock_rag = BedrockRAG()
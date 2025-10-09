const students = [
    {
        name: "Tran Dinh Phong",
        birthYear: 2004,
        isStudent: true
    },
    {
        name: "Tran Dinh Tien",
        birthYear: 2002,
        isStudent: true
    },
    {
        name: "Tran Dinh Hung",
        birthYear: 2005,
        isStudent: false
    }
]

const calcAge = function (student) {
    const today = new Date()
    const currentYear = today.getFullYear()
    return currentYear - student.birthYear
}

students.map(student => {
    console.log(`
        Ten: ${student.name} 
        Tuoi: ${calcAge(student)} 
        Sinh vien: ${student.isStudent === true ? "Dung" : "Sai"}
        `
    )
})
function handleException(errorMessage: string): never { // never ko tra ra gi ca
    throw Error(errorMessage)
}

function runInfinity(): void { // void van se tra ra undefined
    // while (true) {
    //     // console.log("running...")
    // }
}

// handleException("just a test error");

let a = handleException("just a test error");
console.log(">> check a= ", a)
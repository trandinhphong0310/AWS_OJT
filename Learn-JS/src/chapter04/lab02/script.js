

const averageScore = (toan, van, anh) => {
    return (toan + van + anh) / 3
}

const rankingScore = (avg) => {
    if(avg >= 9) {
        return "Xuat sac"
    }
    else if(avg >= 8 && avg < 9) {
        return "Gioi"
    }
    else if(avg >= 6.5 && avg < 8) {
        return "Kha"
    }
    else {
        return "Trung binh"
    }
}

const avg = averageScore(6, 7 ,10)

console.log(`Diem tb: ${avg}, Xep loai: ${rankingScore(avg)}`)
const createCsvWriter = require('csv-writer').createArrayCsvWriter

// Global Variables
let cwaLimit = [[75, 100], [65, 95], [65, 95], [58, 80], [55, 78], [48, 77], [30, 75], [30, 70], [30, 65], [30, 65]] 
let gpaLimit = [[3.5, 4], [3, 4], [2.5, 4], [2.5, 4], [2, 4], [1.5, 4], [1.5, 4], [1, 4], [1, 3.5], [0.5, 3.5]]
let cwaGrades = [[80, 88], [75, 79], [70, 74], [65, 69], [60, 64], [55, 59], [50, 54], [45, 49], [40, 44], [35, 39]] 
let gpaGrades = [[3.9, 4], [3.8, 3.89], [3.6, 3.79], [3.3, 3.59], [3, 3.29], [2.75, 2.99], [2.5, 2.74], [2, 2.49], [1, 1.99], [0.5, 0.99]] 
let studyLimit = [[5, 2], [4.5, 2], [4.25, 1], [4, 1], [3.5, 0.75], [3, 0.5], [2.75, 0.15], [2.25, 0.15], [2, 0], [2, 0]]
let avgStudy = [3, 2.75, 2.25, 1.75, 1.5, 1.25, 1, 0.75, 0.5, 0]
let rate = [0.04, 0.06, 0.09, 0.18, 0.23, 0.16, 0.12, 0.05, 0.03, 0.04]

function GenerateBoundNumbers(lower, upper, deicimal, steps){
    min = Math.ceil(lower)
    max = Math.floor(upper)
    num = (Math.random() * (max - min)) + min

    if(deicimal) return Math.round(num * 100)/100

    if(steps) return roundStep(num, 0.5)

    return Math.floor(Math.random() * (max - min + 1)) + min
}

function roundStep(value, step){
    step || (step = 1.0);
    var inv = 1.0 / step
    return Math.round(value * inv) / inv
}

function GenerateStudyHour(cwa, score, diff, avgStudy, studyLimit, weeks){
    let diffAvg = (diff[0][0] + diff[0][1])/2

    if(score > cwa && diff[1] > diffAvg){
        num = (Math.random() * (studyLimit[0] - avgStudy)) + avgStudy
        return (roundStep(num, 0.25)) 
    }

    if((score < cwa && (diff[1] <= diffAvg || diff[1] > diffAvg)) || (score > cwa && diff[1] <= diffAvg)){
        num = (Math.random() * (avgStudy - studyLimit[1])) + studyLimit[1]
        return roundStep(num, 0.25) 
    }

    if(score === cwa) return avgStudy 
}

function GenerateCwaGpa(cwaLimit, gpaLimit, total, rate){
    let cwa = []
    let gpa = []
    for(let i = 0; i < (total * rate[0]); i ++){
        numcwa = GenerateBoundNumbers(cwaLimit[0][0], cwaLimit[0][1], true)
        numgpa = GenerateBoundNumbers(gpaLimit[0][0], gpaLimit[0][1], true)
        cwa.push(numcwa)
        gpa.push(numgpa)
    }
    for(let i = 0; i < (total * rate[1]); i ++){
        numcwa = GenerateBoundNumbers(cwaLimit[1][0], cwaLimit[1][1], true)
        numgpa = GenerateBoundNumbers(gpaLimit[1][0], gpaLimit[1][1], true)
        cwa.push(numcwa)
        gpa.push(numgpa)
    }
    for(let i = 0; i < (total * rate[2]); i ++){
        numcwa = GenerateBoundNumbers(cwaLimit[2][0], cwaLimit[2][1], true)
        numgpa = GenerateBoundNumbers(gpaLimit[2][0], gpaLimit[2][1], true)
        cwa.push(numcwa)
        gpa.push(numgpa)
    }
    for(let i = 0; i < (total * rate[3]); i ++){
        numcwa = GenerateBoundNumbers(cwaLimit[3][0], cwaLimit[3][1], true)
        numgpa = GenerateBoundNumbers(gpaLimit[3][0], gpaLimit[3][1], true)
        cwa.push(numcwa)
        gpa.push(numgpa)
    }
    for(let i = 0; i < (total * rate[4]); i ++){
        numcwa = GenerateBoundNumbers(cwaLimit[4][0], cwaLimit[4][1], true)
        numgpa = GenerateBoundNumbers(gpaLimit[4][0], gpaLimit[4][1], true)
        cwa.push(numcwa)
        gpa.push(numgpa)
    }
    for(let i = 0; i < (total * rate[5]); i ++){
        numcwa = GenerateBoundNumbers(cwaLimit[5][0], cwaLimit[5][1], true)
        numgpa = GenerateBoundNumbers(gpaLimit[5][0], gpaLimit[5][1], true)
        cwa.push(numcwa)
        gpa.push(numgpa)
    }
    for(let i = 0; i < (total * rate[6]); i ++){
        numcwa = GenerateBoundNumbers(cwaLimit[6][0], cwaLimit[6][1], true)
        numgpa = GenerateBoundNumbers(gpaLimit[6][0], gpaLimit[6][1], true)
        cwa.push(numcwa)
        gpa.push(numgpa)
    }
    for(let i = 0; i < (total * rate[7]); i ++){
        numcwa = GenerateBoundNumbers(cwaLimit[7][0], cwaLimit[7][1], true)
        numgpa = GenerateBoundNumbers(gpaLimit[7][0], gpaLimit[7][1], true)
        cwa.push(numcwa)
        gpa.push(numgpa)
    }
    for(let i = 0; i < (total * rate[8]); i ++){
        numcwa = GenerateBoundNumbers(cwaLimit[8][0], cwaLimit[8][1], true)
        numgpa = GenerateBoundNumbers(gpaLimit[8][0], gpaLimit[8][1], true)
        cwa.push(numcwa)
        gpa.push(numgpa)
    }
    for(let i = 0; i < (total * rate[9]); i ++){
        numcwa = GenerateBoundNumbers(cwaLimit[9][0], cwaLimit[9][1], true)
        numgpa = GenerateBoundNumbers(gpaLimit[9][0], gpaLimit[9][1], true)
        cwa.push(numcwa)
        gpa.push(numgpa)
    }
    return {"cwaArray": cwa, "gpaArray": gpa}
}

function GenerateScore(cwaLimit, total, rate){
    let r = 0
    let a = 0
    let tot = 0
    let count = []
    let tempScoreGpa = []
    let tempScoreCwa = []
    let tempCwa = []
    let tempGpa = []
    let tempDiff = []
    let temphrs = [] 
    let dataCwa = []
    let dataGpa = []
    

    for (let rat of rate){
        tot = tot + (total * rat)
        count.push(tot);
    }
    let {cwaArray, gpaArray} = GenerateCwaGpa(cwaGrades, gpaGrades, total, rate)
    for(let o in cwaArray){
        noCourse = GenerateBoundNumbers(6, 12)
        for(let i = 0; i < noCourse; i ++){
            scoreCwa = GenerateBoundNumbers(cwaLimit[r][0], cwaLimit[r][1])
            // scoreGpa = GenerateBoundNumbers(gpaLimit[r][0], gpaLimit[r][1], false, 0.5)
            diff = GenerateBoundNumbers(1,5)
            hour = GenerateStudyHour(cwaArray[o], scoreCwa, [[1,5], diff], avgStudy[r], studyLimit[r], 15)

            tempDiff.push(diff)
            temphrs.push(hour)
            tempScoreCwa.push(scoreCwa)
            // tempScoreGpa.push(scoreGpa)
            tempCwa.push(cwaArray[o])
            // tempGpa.push(gpaArray[o])
            
            if(i === (noCourse - 1)){
                var totalCredits = GenerateBoundNumbers(16, 24) 
                var credits = GenerateCredits(noCourse, [1, 4], totalCredits)

                // tempScoreGpa = GenerateCorrectGpaScores(tempScoreGpa, credits, totalCredits, gpaArray[o])
                tempScoreCwa = GenerateCorrectCwaScores(tempScoreCwa, credits, totalCredits, cwaArray[o]) 
                

                for(let i in tempCwa){
                    tempCwaData = [tempCwa[i], credits[i], temphrs[i], tempDiff[i], tempScoreCwa[i]]
                    // tempGpaData = [tempGpa[i], credits[i], temphrs[i], tempDiff[i], tempScoreGpa[i]]
                    dataCwa.push(tempCwaData)
                    // dataGpa.push(tempGpaData)
                }

                tempScoreCwa = []
                // tempScoreGpa = []
                tempCwa = []
                tempDiff = []
                temphrs = []
            }
        } a = a + 1   
        if (a === count[0])  r = r + 1
        if (a === count[1])  r = r + 1
        if (a === count[2])  r = r + 1
        if (a === count[3])  r = r + 1
        if (a === count[4])  r = r + 1
        if (a === count[5])  r = r + 1
        if (a === count[6])  r = r + 1
        if (a === count[7])  r = r + 1
        if (a === count[8])  r = r + 1
        if (a === count[9])  r = r + 1
    }
    
    saveArrayToCSV(dataCwa)
}

GenerateScore(cwaLimit, 20000, rate)

function GenerateCorrectCwaScores(scores, credits, totalCredits, cwa){
    swa = (credits.reduce((r, a, i ) => {return r + a*scores[i]}, 0))/ totalCredits
    var diff = Math.round((cwa - swa) * totalCredits)
 
    if(diff < 0){
        while(diff < 0){
            for(let i = 0; i < scores.length; i++){
                if(diff < 0 && scores[i] > 30){
                    scores[i] --
                    diff = diff + credits[i]
                }
                if (diff >= 0) break
                if (i === (scores.length - 1)) continue
            }
        }
    }
    else if(diff > 0){
        while(diff > 0){
            for(let i = 0; i < scores.length; i++){
                if(diff > 0 && scores[i] <= 100){
                    scores[i] ++
                    diff = diff - credits[i]
                }
                if (diff <= 0) break
                if (i === (scores.length - 1)) continue
            }
        }
    }
        
    return scores
}

function GenerateCorrectGpaScores(scores, credits, totalCredits, gpa){
    swa = (credits.reduce((r, a, i ) => {return r + a*scores[i]}, 0))/ totalCredits
    swa = Math.round(swa * 100)/100
    var diff = Math.round((gpa - swa) * totalCredits)
    // console.log(diff)
    return scores
}

function GenerateCredits(n, range , sum){
    var aryRet = [];
    var fSumTmp;
    for (var i = 0; i < n; i++) {
        iTmp = GenerateBoundNumbers(range[0], range[1])
        aryRet.push(iTmp);
    }
    fSumTmp = aryRet.reduce((a,b) => { return a + b; })
    var diff = sum - fSumTmp
    while(diff !== 0){
        for(let i = 0; i < aryRet.length; i++){
            if(diff > 0 && aryRet[i] >= 1 && aryRet[i] < 4){
                aryRet[i] ++
                diff --
            }
            if(diff < 0 && aryRet[i] > 1 && aryRet[i] <= 4){
                aryRet[i] --
                diff ++
            }
            if (diff === 0) break
            if (i === (aryRet.length - 1)) continue
        }
    }
    return aryRet
}


function saveArrayToCSV(dataCwa){
    // let sys = "Cwa"
    // let data = dataCwa
    // let sysPoint = "Score"
    // for (let i=0; i<2; i++){
        // if (i===1) {sys = "Gpa" , sysPoint = 'Grade', data = dataGpa}
        const csvWriter = createCsvWriter({
            header: [`cwa`, "credit", "time", "difficulty", `score`],
            path: `data_cwa.csv`
        })
        csvWriter.writeRecords(dataCwa).then(() => console.log("....Done")) 
    // }
}
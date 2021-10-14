const createCsvWriter = require('csv-writer').createArrayCsvWriter

// Global Variables
let gpaLimit = [[3.5, 4], [3, 4], [2.5, 4], [2.5, 4], [2, 4], [1.5, 4], [1.5, 4], [1, 4], [1, 3.5], [0.5, 3.5]]
let gpaGrades = [[3.9, 4], [3.8, 3.89], [3.6, 3.79], [3.3, 3.59], [3, 3.29], [2.75, 2.99], [2.5, 2.74], [2.3, 2.49], [2, 2.29], [1, 1.99]] 
let studyLimit = [[6, 2], [5, 2], [4.5, 1], [4, 1], [3.5, 0.75], [3, 0.5], [2.75, 0.15], [2.25, 0.15], [2, 0], [2, 0]]
let avgStudy = [3, 2.75, 2.25, 1.75, 1.5, 1.25, 1, 0.75, 0.5, 0]
let rate = [0.04, 0.06, 0.09, 0.18, 0.23, 0.16, 0.12, 0.05, 0.03, 0.04]

function GenerateBoundNumbers(lower, upper, decimal, steps){
    min = Math.ceil(lower)
    max = Math.floor(upper)
    num = (Math.random() * (max - min)) + min

    if(decimal) return Math.round(num * 100)/100

    if(steps) return roundStep(num, steps)

    return Math.floor(Math.random() * (max - min + 1)) + min
}

function roundStep(value, step){
    step || (step = 1.0);
    var inv = 1.0 / step
    return Math.round(value * inv) / inv
}

function GenerateStudyHour(gpa, gpaPoint, diff, avgStudy, studyLimit){
    let diffAvg = (diff[0][0] + diff[0][1])/2
    if(gpaPoint > gpa && diff[1] > diffAvg){
        num = (Math.random() * (studyLimit[0] - avgStudy)) + avgStudy
        return (roundStep(num, 0.25)) 
    }

    if((gpaPoint < gpa && (diff[1] <= diffAvg || diff[1] > diffAvg)) || (gpaPoint > gpa && diff[1] <= diffAvg)){
        num = (Math.random() * (avgStudy - studyLimit[1])) + studyLimit[1]
        return roundStep(num, 0.25) 
    }

    if(gpaPoint === gpa) return avgStudy
}

function GenerateGpa(gpaLimit, total, rate){
    let gpa = []
    for(let i = 0; i < (total * rate[0]); i ++){
        numgpa = GenerateBoundNumbers(gpaLimit[0][0], gpaLimit[0][1], true)
        gpa.push(numgpa)
    }
    for(let i = 0; i < (total * rate[1]); i ++){
        numgpa = GenerateBoundNumbers(gpaLimit[1][0], gpaLimit[1][1], true)
        gpa.push(numgpa)
    }
    for(let i = 0; i < (total * rate[2]); i ++){
        numgpa = GenerateBoundNumbers(gpaLimit[2][0], gpaLimit[2][1], true)
        gpa.push(numgpa)
    }
    for(let i = 0; i < (total * rate[3]); i ++){
        numgpa = GenerateBoundNumbers(gpaLimit[3][0], gpaLimit[3][1], true)
        gpa.push(numgpa)
    }
    for(let i = 0; i < (total * rate[4]); i ++){
        numgpa = GenerateBoundNumbers(gpaLimit[4][0], gpaLimit[4][1], true)
        gpa.push(numgpa)
    }
    for(let i = 0; i < (total * rate[5]); i ++){
        numgpa = GenerateBoundNumbers(gpaLimit[5][0], gpaLimit[5][1], true)
        gpa.push(numgpa)
    }
    for(let i = 0; i < (total * rate[6]); i ++){
        numgpa = GenerateBoundNumbers(gpaLimit[6][0], gpaLimit[6][1], true)
        gpa.push(numgpa)
    }
    for(let i = 0; i < (total * rate[7]); i ++){
        numgpa = GenerateBoundNumbers(gpaLimit[7][0], gpaLimit[7][1], true)
        gpa.push(numgpa)
    }
    for(let i = 0; i < (total * rate[8]); i ++){
        numgpa = GenerateBoundNumbers(gpaLimit[8][0], gpaLimit[8][1], true)
        gpa.push(numgpa)
    }
    for(let i = 0; i < (total * rate[9]); i ++){
        numgpa = GenerateBoundNumbers(gpaLimit[9][0], gpaLimit[9][1], true)
        gpa.push(numgpa)
    }
    return gpa
}


function GenerateGpaPoints(gpaLimit, total, rate){
    let r = 0
    let a = 0
    let tot = 0
    let count = []
    let tempGpaPoints = []
    let tempGpa = []
    let tempDiff = []
    let temphrs = [] 
    let dataGpa = []
    

    for (let rat of rate){
        tot = tot + (total * rat)
        count.push(tot);
    }

    let gpaArray = GenerateGpa(gpaGrades, total, rate)

    for(let o in gpaArray){
        noCourse = GenerateBoundNumbers(6, 12)
        for(let i = 0; i < noCourse; i ++){
            gpaPoint = GenerateBoundNumbers(gpaLimit[r][0], gpaLimit[r][1], false, 0.5)
            diff = GenerateBoundNumbers(1,5)
            
            hour = GenerateStudyHour(gpaArray[o], gpaPoint, [[1,5], diff], avgStudy[r], studyLimit[r])

            tempDiff.push(diff)
            temphrs.push(hour)
            tempGpaPoints.push(gpaPoint)
            tempGpa.push(gpaArray[o])

            if(i === (noCourse - 1)){
                var totalCredits = GenerateBoundNumbers(16, 24) 
                var credits = GenerateCredits(noCourse, [1, 6], totalCredits)
                tempGpaPoints = GenerateCorrectGpaPoints(tempGpaPoints, credits, totalCredits, gpaArray[o])
                

                for(let i in tempGpa){
                    tempGpaData = [tempGpa[i], credits[i], temphrs[i], tempDiff[i], tempGpaPoints[i]]
                    dataGpa.push(tempGpaData)
                }

                tempGpa = []
                tempDiff = []
                temphrs = []
                tempGpaPoints = []
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
    saveArrayToCSV(dataGpa)
}

GenerateGpaPoints(gpaLimit, 450, rate)

function GenerateCorrectGpaPoints(gpaPoints, credits, totalCredits, gpa){
    swa = (credits.reduce((r, a, i ) => {return r + a*gpaPoints[i]}, 0))/ totalCredits
    var diff = Math.round((gpa - swa) * totalCredits)

    while(diff < -0.5){
        for(let i = 0; i < gpaPoints.length; i++){
            if(diff < 0 && gpaPoints[i] > 0.5){
                gpaPoints[i] -= 0.5
                diff = diff + (0.5 * credits[i])
            }
            if (diff >= -0.5) break
            if (i === (gpaPoints.length - 1) ) continue
        }
    }


    while(diff > 0.5){
        for(let i = 0; i < gpaPoints.length; i++){
            if(diff > 0 && gpaPoints[i] < 4){
                gpaPoints[i] += 0.5
                diff = diff - (0.5 * credits[i])
            }
            if (diff <= 0.5) break
            if (i === (gpaPoints.length - 1)) continue
        }
    }

    return gpaPoints
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
            if(diff > 0 && aryRet[i] >= 1 && aryRet[i] < range[1]){
                aryRet[i] ++
                diff --
            }
            if(diff < 0 && aryRet[i] > 1 && aryRet[i] <= range[1]){
                aryRet[i] --
                diff ++
            }
            if (diff === 0) break
            if (i === (aryRet.length - 1)) continue
        }
    }
    return aryRet
}


function saveArrayToCSV(dataGpa){
    const csvWriter = createCsvWriter({
        header: [`gpa`, "credit", "time", "difficulty", `points`],
        path: `data_gpa.csv`
    })
    csvWriter.writeRecords(dataGpa).then(() => console.log("....Done")) 
}
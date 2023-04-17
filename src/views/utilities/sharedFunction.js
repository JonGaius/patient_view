export const capitalize = (word) => {
    const lower = word.toLowerCase()
    return lower.charAt(0).toUpperCase() + lower.slice(1)
}

export const titlePage = (title) => {
    if(title){
        document.title = capitalize(title) + " | BF-TLM Plateforme";
    }else {
        document.title =" Bienvenue sur BF-TLM Plateforme";
    }
}

export function truncate(str, maxlength) {
    return (str.length > maxlength) ?
        str.slice(0, maxlength - 1) + '…' : str;
}

export const formatNumber = (data) => {
    let number = parseInt(data)

    let result = number / 1000000000
    if(result >= 1){
        return Math.round(result*100)/100 + "Md"
    }
    result = number / 1000000
    if(result >= 1){
        return Math.round(result*100)/100 + "M"
    }
    result = number / 1000
    if(result >= 1){
        return parseInt(result) + "k"
    }
    return number
}

export const formatNumber2 = (data) => {
    let number = parseInt(data)

    let result = number / 1000000000
    if(result >= 1){
        return Math.round(result*100)/100 + "Md"
    }
    result = number / 1000000
    if(result >= 1){
        return Math.round(result*100)/100 + "M"
    }
    return number
}
export const fetchImage = (images) => {
    let array = []
    if(images){
        images.forEach(image => {
            array = ([...array, image.url])
        });
    }
    return array
}
export const formatMyDate = (mdate) => {
    let now = Date.now()
    let day = new Date(mdate)
    var dif = now - day
    let jour = dif / (1000 * 3600 * 24)

    if(jour > 1){
        return "il y a " + Math.round(jour) + "jrs"
    }else{
        if(jour === 1){
            return "hier"
        }else{
            let heure = dif / (1000 * 3600)
            if(heure > 1){
                return "il y a " + Math.round(heure) + "h"
            }else{
                let min = dif / (1000 * 60)
                if(min > 1){
                    return "il ya " + Math.round(min)+ "min"
                }else{
                    let second = dif / 1000
                    if(second > 1){
                        return "il y a " + Math.round(second)+"s"
                    }else{
                        return "maintenant"
                    }
                }
            }
        }
    }
}

export const fileSizeCalculate = (size) => {
    let sizeInBytes = size / 1000000
    if(sizeInBytes > 1){
        return Math.round(sizeInBytes) + "Mo"
    }else{
        return Math.round(sizeInBytes * 10) / 10 + "ko"
    }
}
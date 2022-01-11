//SETS DEFAULT TEXT IF TASK INPUT FIELDS ARE EMPTY 
export const ifEmptyTaskFileds = (i, content_type) => {
    if (content_type !== "title") {
        if (!Boolean(i) && !isNaN(i)) {
            return "Task description"
        }else{
            return i
        }
    }else{
        if (!Boolean(i) && !isNaN(i)) {
            return "Task title"
        }else{
            return i
        }
    }
}
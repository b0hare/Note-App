function dateFormate(updated_at) {
    if(updated_at === ""){
        return ""
    }
    const formattedDate = new Intl.DateTimeFormat('en-US', {
            month: 'short',    
            day: '2-digit',   
            year: 'numeric',    
            hour: '2-digit',  
            minute: '2-digit',
            hour12: true      
        }).format(new Date(updated_at));
        
        return formattedDate.replace(',', '').replace(',', ' •');
}

export default dateFormate;
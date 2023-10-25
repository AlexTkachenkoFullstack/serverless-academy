function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day} ${hour}:00:00`;
    return formattedDate;
}

module.exports=formatDate;
// MMM Método que se le pasa una fecha y la formatea de tipo date a string (por ejemplo, 2023-06-06 a 6 de junio de 2023).
function formatDate(reviewDate: Date): string {
    
    let reviewDateTypeString = '';

    const dateObject = new Date(reviewDate);
      const day = dateObject.getDate();
      const monthNumber = dateObject.getMonth();
      const year = dateObject.getFullYear();
  
      const months = [
        "enero",
        "febrero", 
        "marzo", 
        "abril", 
        "mayo", 
        "junio",
        "julio", 
        "agosto", 
        "septiembre", 
        "octubre", 
        "noviembre", 
        "diciembre"
      ];
      
    // MMM En JavaScript, los meses se representan como números enteros del 0 al 11.
    // MMM Si monthNumber es 0, months[monthNumber] devolverá 'enero'
    // MMM Se está utilizando monthNumber como índice para acceder al nombre del mes correspondiente en el array months.
    const monthName = months[monthNumber];

    reviewDateTypeString = `${day} de ${monthName} de ${year}`;   

    return reviewDateTypeString;

}

export { formatDate }
export const getSeasonMonths = () => {
    const month = new Date().getMonth() + 1; // January is 0, so add 1
  
    if (month >= 3 && month <= 5) return ["March", "April", "May"]; // Spring months
    if (month >= 6 && month <= 8) return ["June", "July", "August"]; // Summer months
    if (month >= 9 && month <= 11) return ["September", "October"]; // Fall months
    
    // Winter months: December, January, February
    return ["November","December", "January", "February"];
  };
  
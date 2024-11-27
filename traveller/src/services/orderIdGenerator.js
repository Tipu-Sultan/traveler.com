export function generateOrderId(packageName=null) {
    // Extract the first letter of each word in the package name
    const packageInitials = packageName
      .split(' ')            // Split the package name into words
      .map(word => word[0])   // Get the first letter of each word
      .join('');              // Join the letters together
  
    // Format the date as YYYYMMDD
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, '');
  
    // Generate a 4-digit random number
    const randomDigits = Math.floor(1000 + Math.random() * 9000); // Ensures 4-digit number
  
    // Construct the order ID
    const orderId = `T${packageInitials}-${formattedDate}-${randomDigits}`;
  
    return orderId;
  }
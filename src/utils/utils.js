
export const formatted = (review) => {
    if(review !== ''){
      const points = review.split('\n').filter(line => line.trim() !== '');
      // Use a Map to dynamically group related points
      const categoriesMap = new Map();

      points.forEach(point => {
          // Extract key phrase for potential category (e.g., first few words)
          const keyPhrase = point.split(':')[0].split('. ')[1]; // Get the main descriptor
          const keyText = point.split(':')[1]
          const category = keyPhrase || "Uncategorized"; // Default to 'Uncategorized' if no descriptor

          if (!categoriesMap.has(category)) {
              categoriesMap.set(category, []); // Create a new category if it doesn't exist
          }
          categoriesMap.get(category).push(keyText); // Add the point to its category
      });

      // Display the parsed points with generated headings
      // Build formatted HTML
      
      return Array.from(categoriesMap.entries()).map(([heading, items]) => (
        <div key={heading}>
          <h3>{heading}</h3>
          <ul>
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )); 
    }
  }
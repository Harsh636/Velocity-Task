// import React, { useState } from 'react';

// export default function SelectCategory({ onNext }) {
//   const [category, setCategory] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!category) return alert("Please select a category");
//     onNext(category);
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">RFP Select Category</h2>
//       <form onSubmit={handleSubmit}>
//         <label className="block mb-2 font-medium">Categories*</label>
//         <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 w-full mb-4">
//           <option value="">-- Select Category --</option>
//           <option value="abc">abc</option>
//           <option value="xyz">xyz</option>
//         </select>
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Submit</button>
//         <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
//       </form>
//     </div>
//   );
// }

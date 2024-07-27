// // Utility function to format the time as "ago"
// export const timeAgo = (timestamp) => {
//   if (typeof timestamp === "number" && timestamp.toString().length <= 10) {
//     timestamp *= 1000; // Convert seconds to milliseconds
//   }

//   const then = new Date(timestamp);
//   const now = new Date();

//   if (isNaN(then.getTime())) {
//     console.error(`Invalid date for timestamp: ${timestamp}`);
//     return "Invalid date";
//   }

//   const seconds = Math.floor((now - then) / 1000);

//   if (seconds < 60) return "just now";
//   if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
//   if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
//   if (seconds < 2592000) return `${Math.floor(seconds / 86400)} days ago`;
//   if (seconds < 31536000) return `${Math.floor(seconds / 2592000)} months ago`;

//   return `${Math.floor(seconds / 31536000)} years ago`;
// };

export const formatUrl = (format: string): string => {
    const args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, (match, num) => {
        return typeof args[num] !== 'undefined'
            ? args[num]
            : match;
    });
};

// String.format = function(format) {
//     let args = Array.prototype.slice.call(arguments, 1);
//     return "format".replace(/{(\d+)}/g, function(match, number) {
//       return typeof args[number] !== 'undefined'
//         ? args[number]
//         : match;
//     });
//   };

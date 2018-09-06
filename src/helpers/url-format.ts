export const formatUrl = (format: string): string => {
    const args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, (match, num) => {
        return typeof args[num] !== 'undefined'
            ? args[num]
            : match;
    });
};

const debounce = (func, wait, immediate) =>
{
    let timeout;
    return function() 
    {
        const me = this, args = arguments;
        const later = function() 
        {
            timeout = null;
            if (!immediate) func.apply(me, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait || 250);
        if (callNow) func.apply(me, args);
    };
};

export default debounce;
export const addClass = (elt, className) => elt.className += ' ' + className;

export const removeClass = (elt, className) => elt.className = elt.className.replace(new RegExp('(?:^|\\s)'+ className + '(?:\\s|$)'), ' ');

export const hasClass = (elt, className) => (' ' + elt.className + ' ').replace(/[\n\t]/g, ' ').indexOf(' ' + className + ' ') > -1;

export const on = (elt, types, listener) =>
{
    const arrTypes = types.split(' ');
    for (let type of arrTypes)  
    {
        elt.addEventListener(type.trim(), listener);
    }
};

export const off = (elt, types, listener) =>
{
    const arrTypes = types.split(' ');
    for (let type of arrTypes)  
    {
        elt.removeEventListener(type.trim(), listener);
    }
};

export const whichTransitionEvent = () =>
{
    const elt = document.createElement('fakeelement');
    const transitions = 
    {
        'transition':'transitionend',
        'OTransition':'oTransitionEnd',
        'MozTransition':'transitionend',
        'WebkitTransition':'webkitTransitionEnd'
    }
    for (let t in transitions)
    {
        if(elt.style[t] !== undefined) return transitions[t];
    }
};
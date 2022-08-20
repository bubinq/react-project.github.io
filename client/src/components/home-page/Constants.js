export const showHideAnimate = {
    hide: {
        x: '-100vw',
        opacity: 0,
        transition: { duration: 0.5 }
    },
    show: {
        x: 0,
        y: -20,
        opacity: 1,
        transition: { duration: 0.9 }
    }
}

export const stepAnimate = {
    hidden: { x: "100vw", opacity: 0 },
    item1: { x: 0, opacity: 1, transition: { duration: 0.7 } },
    item2: { x: 0, opacity: 1, transition: { duration: 0.8 } },
    item3: { x: 0, opacity: 1, transition: { duration: 0.9 } },
};


export const headerAnimate = {
    hidden : {y: '-100vh', opacity: 0},
    show : {y: 0, opacity: 1, transition: {duration:0.8}}
}
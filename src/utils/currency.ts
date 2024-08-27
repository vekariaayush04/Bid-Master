export  function formatRupee (paisa : number) {
    return Math.floor(paisa/100).toFixed(2)
}
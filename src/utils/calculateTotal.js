export const calculateTotal = (list) => {
    return (list.reduce((acc, curr) => acc + (curr?.quantity * curr?.price), 0)).toFixed(2)
}
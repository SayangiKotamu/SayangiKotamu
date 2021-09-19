export default function formatDescription(description) {
    const charLimit = 100

    if (description.length > charLimit) {
        return `${description.split('').splice(0, charLimit).join('')}...`
    } else {
        return description
    }
}

export default function formatDescription(description) {
    const charLimit = 130

    if (description.length > charLimit) {
        return `${description.split('').splice(0, charLimit).join('')}...`
    } else {
        return description
    }
}

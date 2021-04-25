export const levenshteinDistance = (string1 = '', string2 = '') => {
    const track = Array(string2.length + 1).fill(null).map(() => Array(string1.length + 1).fill(null));

    for (let i = 0; i <= string1.length; i++) {
        track[0][i] = i;
    }

    for (let j = 0; j <= string2.length; j++) {
        track[j][0] = j;
    }

    for (let j = 0; j <= string2.length; j++) {
        for (let i = 0; i <= string1.length; i++) {
            const indicator = string1[i-1] === string2[j-1] ? 0 : 1;
            track[j][i] = Math.min(
                track[j][i-1] + 1, // deletion
                track[j-1][i] + 1, // insertion
                track[j-1][i-1] + indicator, // substitution
            );
        }
    }

    return track[string2.length][string1.length];
};
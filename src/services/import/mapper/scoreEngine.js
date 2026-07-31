/**
 * Selects the best header candidate.
 *
 * @param {Object[]} candidates
 * @returns {Object|null}
 */
export function scoreCandidates(candidates = []) {

    if (candidates.length === 0) {
        return null;
    }

    const sorted = [...candidates]
        .map(candidate => ({

            ...candidate,

            totalScore:
                (candidate.headerScore ?? 0) +
                (candidate.profileScore ?? 0)

        }))
        .sort((a, b) => {

            if (b.totalScore !== a.totalScore) {
                return b.totalScore - a.totalScore;
            }

            return a.column - b.column;

        });

    return sorted[0];

}
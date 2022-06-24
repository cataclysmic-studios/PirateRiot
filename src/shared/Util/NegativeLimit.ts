export default function NegativeLimit(n: number, limit: number): number {
    if (n < -limit)
        return -limit;
    else if (n > limit)
        return limit;

    return n;
}
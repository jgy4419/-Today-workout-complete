export function decode(text) {
    // https://codepen.io/csmccoy/pen/yLNBpyW?editors=1010
    return $("<textarea/>").html(text).text();
}
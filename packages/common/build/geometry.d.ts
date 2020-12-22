export declare class Vector {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    /**
     * Set the x and y coordinates
     */
    set(x: number, y: number): void;
    /**
     * Return wether this vector is at (0,0) or not
     */
    get empty(): boolean;
}
/**
 * An object to represent a Rectangle shape
 */
export declare class RectangleBody {
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(x: number, y: number, width: number, height: number);
    /**
     * Return a copy of this object
     */
    copy(): RectangleBody;
    get left(): number;
    get top(): number;
    get right(): number;
    get bottom(): number;
    get position(): Vector;
    get center(): Vector;
    set left(left: number);
    set top(top: number);
    set right(right: number);
    set bottom(bottom: number);
    set position(vector: Vector);
}
/**
 * An object to represent a Circle shape
 */
export declare class CircleBody {
    x: number;
    y: number;
    radius: number;
    constructor(x: number, y: number, radius: number);
    /**
     * Return a copy of this object
     */
    copy(): CircleBody;
    get left(): number;
    get top(): number;
    get right(): number;
    get bottom(): number;
    get width(): number;
    get height(): number;
    get box(): RectangleBody;
    set left(left: number);
    set top(top: number);
    set right(right: number);
    set bottom(bottom: number);
}

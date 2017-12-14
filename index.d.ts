interface Object {
    /**
     * Destructure an object into an object.
     * 
     */
    destructure<T>(wrap: () => T, clone?: boolean): Partial<T>;
}

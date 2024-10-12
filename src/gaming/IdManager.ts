class IdManager {
    private id: number = 0;
    public initNewId() {
        this.id += 1;
        return this.id
    }
}

export default new IdManager()
export class Story {
    constructor(storyContent, storyPoint) {
        this.storyContent = storyContent;
        this.storyPoint = storyPoint;
    }
    clone() {
        return new Story(this.storyContent, this.storyPoint);
    }
}
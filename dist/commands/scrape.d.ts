import { Command } from '@oclif/core/lib/';
export default class Scrape extends Command {
    static description: string;
    static examples: string[];
    static args: ({
        name: string;
        description: string;
        default: string;
    } | {
        name: string;
        default: string;
        description?: undefined;
    })[];
    private output;
    private images;
    run(): Promise<void>;
    private index;
    runWorker: (list: string[]) => Promise<void>;
}

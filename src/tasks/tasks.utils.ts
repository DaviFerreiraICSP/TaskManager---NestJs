import { Injectable } from "@nestjs/common";

@Injectable()
export class TaskUtils{

    splitString(text: string){
        return text.split(" ")
    }

}

//Learning how to use Injectables! Useless file :<
import { GlobalComponent } from "../global";

export const getIndexsSegments=(segments:number[])=>{
    const group=GlobalComponent.appGroupSeleted;
    const arrayIndex:number[]=[];
    if(group.departure.length > 1){
        group.departure.forEach(departure=>{
            arrayIndex.push(departure.segments[0].segmentId)
        })
    }else{
        const indexDep=group.departure[0].segments.findIndex(segment => segment.segmentId == segments[0]);
        arrayIndex.push(indexDep);
    }

    if(group.returns){
        const indexRet=group.returns.segments.findIndex(segment => segment.segmentId == segments[1]);
        arrayIndex.push(indexRet);
    }

    return arrayIndex;
}

﻿function main(){	var dom = fl.getDocumentDOM();	var tl = dom.getTimeline();	var ls = tl.getSelectedLayers();	if (ls.length != 1)	{		alert("请选择需要抽帧的层(1层)");		return;	}	fl.trace(ls[0]);	var layer = tl.layers[ls[0]];	var count = layer.frameCount;	for(var i=0;i<count;i++)	{		if(i%2==1)		{			tl.clearKeyframes(i,i);		}	}	fl.outputPanel.clear();}main();
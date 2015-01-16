fl.outputPanel.clear();
main();
function main()
{
	dom = fl.getDocumentDOM();
	var timeline = dom.getTimeline();

	var mcName = prompt("输入批量命名的元件名");
	if (mcName.length == 0)
	{
		alert("元件名未指定");
		return;
	}
	var arr = mcName.split(" ");
	mcName = arr[0];
	var startIndex =0;
	if(arr.length>1){
		startIndex = parseInt(arr[1]);
	}
	fl.trace(mcName.length);
	fl.trace(mcName);
	fl.trace(startIndex);
	//var layers = timeline.getSelectedLayers()
	var frames = timeline.getSelectedFrames();

	//var l = timeline.layres[layers];
	//fl.trace("frames:"+frames);

	//fl.trace("layers:"+frames.length);
	for (var i=0; i<frames.length; i+=3)
	{
		var layerIndex = frames[i];
		var startFrame = frames[i + 1];
		var endFrame = frames[i + 2];
		var layer = timeline.layers[layerIndex];
		//fl.trace("cl:"+layerIndex);
		var layerFrames = layer.frames;
		for (var j = startFrame; j < endFrame; j ++)
		{
			var preFrame = layerFrames[j];
			setFrameSelectElemName(preFrame,mcName,startIndex);
		}
	}
}
//设置帧中的元件名称
function setFrameSelectElemName(frame,elemName,startIndex)
{
	var elems = frame.elements;
	var list = getFrameSelectElems(frame);
	//fl.trace("list:"+list.length);
	/*for (var i=0; i<list.length; i++)
	{
	var elem = list[i];
	//fl.trace("ccc:"+elem.name+"|"+elem.selected);
	//elem.name = elemName + "_" + i;
	fl.trace("de:"+elem.x+"-"+elem.y);
	}*/
	list = sortMc(list,["x","y"]);
	for (var i=0; i<list.length; i++)
	{
		var elem = list[i];
		//fl.trace("ccc:"+elem.name+"|"+elem.selected);
		elem.name = elemName + (startIndex+i);
		//fl.trace("de:"+elem.x+"-"+elem.y);
	}
}

function getFrameSelectElems(frame)
{
	var arr = [];
	var elems = frame.elements;
	for (var i=0; i<elems.length; i++)
	{
		var elem = elems[i];
		if (elem.selected)
		{
			arr.push(elem);
		}
	}
	return arr;
}

function sortMc(list,arr)
{
	for (var j=0; j< arr.length; j++)
	{
		list = sortList(list,arr[j]);
	}
	return list;
}

function sortList(list,prop)
{
	var arr = [];
	//fl.trace("sort_"+list.length+"="+prop);
	for (var i=0; i<list.length; i++)
	{
		var j = 0;
		var elem = list[i];

		for (j=0; j<arr.length; j++)
		{
			//fl.trace("arr_"+j+"="+elem[prop]+"="+arr[j][prop]);
			if (elem[prop] < arr[j][prop])
			{
				arr.splice(j,0,elem);
				break;
			}
		}
		//fl.trace("sd"+j+"--"+arr.length);
		if (j == arr.length)
		{
			arr.push(elem);
		}

	}
	return arr;
}
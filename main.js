function preload(){
    
img = loadImage("baby.png")

}


function setup(){
    canvas = createCanvas(350, 300)
    canvas.center()
    objectDetector =  ml5.objectDetector('cocossd', modelLoaded);
    video = createCapture(VIDEO);
    video.size(350, 300);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    video.hide();
    
}


objects=[]

function draw(){
    image(video, 0 , 0, 350, 300)
    if(Status !="")
    {
      r = random(255);
      g = random(255);
      b = random(255);

      objectDetector.detect(video, gotResult);

      for (i = 0; i < objects.length; i++)
      {
        document.getElementById("status").innerHTML = "Status : Objects detected";
        document.getElementById("number_of_objects").innerHTML = "Number of the objects detected are : "+ objects.length;
        fill(r,g,b);
         percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
        noFill(),
        stroke(r,g,b)
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        if(objects[i].label == "person") { document.getElementById("number_of_objects").innerHTML = "Baby Found"; 
        console.log("stop"); song.stop(); 
      } else { document.getElementById("number_of_objects").innerHTML = "Baby Not Found"; console.log("play"); song.play(); 
    }
    
     } if(objects.length == 0) { document.getElementById("number_of_objects").innerHTML = "Baby Not Found"; 
    console.log("play"); song.play(); }

      }
       
    }

    
    

    
    function modelLoaded(){
console.log("ModelLoaded!")
Status = true;

}

function gotResult(error, results){
if (error) {

    console.log(error);
}
console.log(results);
objects = results;
}
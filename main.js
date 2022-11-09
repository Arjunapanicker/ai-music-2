song="";
song2="";
function preload(){
    song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3")
}

LeftWristX=0;
LeftWristY=0;

RightWristX=0;
RightWristY=0;

scoreLeftWrist=0;
function setup()

{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO)
     video.hide();

     poseNet = ml5.poseNet(video,modeLoaded);
     poseNet.on('pose', gotposes);
}
function modeLoaded()
{
console.log('PoseNet Is Intialized');

}
function gotposes(results)
{
    if(results.length>0)
    {
        console.log(results);
         scoreLeftWrist = results[0].pose.keypoints[9].score;
         console.log("scoreLeftWrist = "+ scoreLeftWrist);
        RightWristX = results[0].pose.rightWrist.x;
        RightWristY = results[0].pose.rightWrist.y;
        console.log("RightWristX = "+RightWristX+"RightWristY"+RightWristY);

        LeftWristX = results[0].pose.leftWrist.x;
        LefttWristY = results[0].pose.leftWrist.y;
        console.log("LeftWristX = "+LeftWristX+"LeftWristY"+LeftWristY);
    }
}
function draw()
{
    image(video,0,0,600,500);
    fill("FF0000");
    stroke("#FF0000");

    if(scoreLeftWrist > 0.2)
    {
      circle(LeftWristX,LeftWristY,20);
        InNumberLeftWristY = Number(LeftWristY);
        volume = floor(InNumberLeftWristY)/500;
        document.getElementById("volume").innerHTML = "Volume = " +volume;
        song.setVolume(volume);
    }
}
function play(){
song2.play();
song.setVolume(1);
song.rate(1);
}
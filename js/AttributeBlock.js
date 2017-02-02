//
//  AttributeBlock.js
//  CharacterSheet
//
//  Created by JoKim on 02/02/2017.
//  Copyright © 2017 JoKim. All rights reserved.
//
//  Generated by PaintCode
//  http://www.paintcodeapp.com
//



//// APIs you can use in your code:
//
// Available methods for drawing into <canvas> elements:
//    AttributeBlock.drawAttribute_Block(canvas, targetFrame*, resizing*)
//
// NOTE: 'canvas' parameter can be either a <canvas> element object, or the id of a <canvas> element in your document.
//
// NOTE: Parameters marked with the '*' symbol are optional
//
// NOTE: Possible arguments for 'resizing' parameter in drawing methods are:
//   'aspectfit': The content is proportionally resized to fit into the target rectangle.
//   'aspectfill': The content is proportionally resized to completely fill the target rectangle.
//   'stretch': The content is stretched to match the entire target rectangle.
//   'center': The content is centered in the target rectangle, but it is NOT resized.
//
// Available Utilities:
//    AttributeBlock.clearCanvas(canvas)
//    AttributeBlock.makeRect(x, y, width, height)


//// Create StyleKit Object
var AttributeBlock = {};
(function() {

    //// Drawing Methods

    function drawAttribute_Block(canvas, targetFrame, resizing) {
        //// General Declarations
        canvas = initializeCanvas(typeof canvas === 'string' ? document.getElementById(canvas) : canvas);
        var context = canvas.getContext('2d');
        var pixelRatio = canvas.paintCodePixelRatio;
        
        //// Resize to Target Frame
        context.save();
        var resizedFrame = applyResizingBehavior(resizing, makeRect(0, 0, 53, 62), targetFrame);
        context.translate(resizedFrame.x, resizedFrame.y);
        context.scale(resizedFrame.w / 53, resizedFrame.h / 62);


        //// Color Declarations
        var gray = 'rgba(214, 215, 215, 1)';
        var black = 'rgba(0, 0, 0, 1)';

        //// Group
        //// Oval Drawing
        context.beginPath();
        context.moveTo(26.63, 61.25);
        context.bezierCurveTo(34.06, 61.25, 40.09, 57, 40.09, 51.76);
        context.bezierCurveTo(40.09, 46.52, 34.09, 42.27, 26.63, 42.27);
        context.bezierCurveTo(19.17, 42.27, 13.17, 46.52, 13.17, 51.76);
        context.bezierCurveTo(13.17, 57, 19.17, 61.25, 26.63, 61.25);
        context.closePath();
        context.moveTo(26.63, 58.75);
        context.bezierCurveTo(20.69, 58.75, 15.63, 55.55, 15.63, 51.75);
        context.bezierCurveTo(15.63, 47.95, 20.63, 44.75, 26.63, 44.75);
        context.bezierCurveTo(32.63, 44.75, 37.63, 47.95, 37.63, 51.75);
        context.bezierCurveTo(37.63, 55.55, 32.63, 58.75, 26.63, 58.75);
        context.closePath();
        context.fillStyle = gray;
        context.fill();


        //// Frame Drawing
        context.beginPath();
        context.moveTo(2.78, 32.27);
        context.lineTo(2.78, 32.34);
        context.bezierCurveTo(2.85, 28.49, 2.68, 24.63, 2.27, 20.8);
        context.lineTo(2.16, 20.15);
        context.bezierCurveTo(1.88, 20.4, 1.58, 20.63, 1.28, 20.85);
        context.bezierCurveTo(2, 22.94, 2.42, 28.55, 2.78, 32.27);
        context.closePath();
        context.moveTo(2.78, 55.09);
        context.lineTo(7.49, 55.09);
        context.lineTo(7.44, 55.06);
        context.bezierCurveTo(6.05, 54.16, 4.5, 53.54, 2.87, 53.26);
        context.bezierCurveTo(2.88, 54.03, 2.82, 54.65, 2.78, 55.09);
        context.closePath();
        context.moveTo(3, 52.35);
        context.lineTo(3.04, 52.35);
        context.bezierCurveTo(3.42, 52.4, 3.8, 52.48, 4.17, 52.57);
        context.bezierCurveTo(3.83, 52.22, 3.45, 51.82, 3.07, 51.38);
        context.bezierCurveTo(3.07, 51.72, 3.07, 52.05, 3, 52.38);
        context.moveTo(13.15, 59.38);
        context.lineTo(13.2, 59.38);
        context.bezierCurveTo(12.08, 59.34, 10.97, 59.47, 9.89, 59.76);
        context.bezierCurveTo(11.63, 60.53, 13.92, 61.21, 14.61, 60.78);
        context.lineTo(14.61, 60.78);
        context.bezierCurveTo(14.33, 60.51, 13.8, 60, 13.1, 59.37);
        context.moveTo(26.57, 60.55);
        context.bezierCurveTo(31.14, 60.55, 35.15, 58.88, 37.4, 56.38);
        context.bezierCurveTo(37.58, 56.18, 37.75, 55.97, 37.91, 55.76);
        context.lineTo(37.91, 55.69);
        context.bezierCurveTo(38.05, 55.49, 38.19, 55.29, 38.31, 55.09);
        context.lineTo(38.33, 55.06);
        context.bezierCurveTo(38.95, 54.06, 39.29, 52.92, 39.31, 51.75);
        context.bezierCurveTo(39.31, 46.92, 33.59, 42.97, 26.56, 42.97);
        context.bezierCurveTo(19.53, 42.97, 13.81, 46.91, 13.81, 51.76);
        context.lineTo(13.81, 51.75);
        context.bezierCurveTo(13.83, 52.92, 14.17, 54.06, 14.79, 55.06);
        context.lineTo(14.78, 55.04);
        context.bezierCurveTo(14.91, 55.26, 15.05, 55.47, 15.2, 55.67);
        context.lineTo(15.22, 55.76);
        context.bezierCurveTo(15.38, 55.97, 15.55, 56.18, 15.73, 56.38);
        context.bezierCurveTo(17.98, 58.88, 21.99, 60.55, 26.56, 60.55);
        context.moveTo(38.56, 60.77);
        context.lineTo(38.56, 60.77);
        context.bezierCurveTo(39.25, 61.16, 41.56, 60.48, 43.36, 59.77);
        context.lineTo(43.28, 59.75);
        context.bezierCurveTo(42.2, 59.46, 41.09, 59.33, 39.97, 59.37);
        context.bezierCurveTo(39.31, 60, 38.78, 60.51, 38.51, 60.78);
        context.moveTo(45.69, 55.1);
        context.lineTo(50.4, 55.1);
        context.bezierCurveTo(50.4, 54.67, 50.3, 54.05, 50.24, 53.28);
        context.lineTo(50.3, 53.27);
        context.bezierCurveTo(48.68, 53.56, 47.13, 54.17, 45.74, 55.06);
        context.moveTo(48.99, 52.59);
        context.lineTo(49.02, 52.58);
        context.bezierCurveTo(49.39, 52.48, 49.77, 52.41, 50.15, 52.36);
        context.bezierCurveTo(50.17, 52.06, 50.17, 51.72, 50.1, 51.36);
        context.bezierCurveTo(49.73, 51.8, 49.35, 52.2, 48.98, 52.56);
        context.moveTo(50.39, 32.25);
        context.bezierCurveTo(50.74, 28.53, 51.22, 22.91, 51.81, 20.77);
        context.lineTo(51.76, 20.73);
        context.bezierCurveTo(51.46, 20.51, 51.17, 20.28, 50.9, 20.02);
        context.lineTo(50.89, 20.79);
        context.bezierCurveTo(50.49, 24.61, 50.32, 28.46, 50.39, 32.31);
        context.moveTo(1.53, 52.22);
        context.lineTo(1.71, 52.22);
        context.bezierCurveTo(1.76, 51.49, 1.82, 50.66, 1.87, 49.75);
        context.lineTo(1.83, 49.69);
        context.bezierCurveTo(1.03, 48.51, 0.54, 47.16, 0.39, 45.75);
        context.lineTo(0.41, 45.84);
        context.bezierCurveTo(0.28, 44.1, 0.91, 42.38, 2.12, 41.13);
        context.bezierCurveTo(2.11, 40.89, 2.11, 40.63, 2.11, 40.37);
        context.bezierCurveTo(2.11, 40.37, 1.2, 23.44, 0.37, 20.74);
        context.lineTo(0.26, 20.39);
        context.lineTo(0.57, 20.2);
        context.lineTo(0.63, 20.16);
        context.bezierCurveTo(1.15, 19.81, 1.62, 19.4, 2.05, 18.94);
        context.lineTo(2.02, 18.98);
        context.bezierCurveTo(2.45, 18.57, 2.79, 18.06, 3, 17.5);
        context.lineTo(3.01, 17.48);
        context.bezierCurveTo(3.35, 16.79, 3.44, 16.01, 3.26, 15.26);
        context.bezierCurveTo(3.27, 15.22, 2.89, 14.4, 2.54, 13.34);
        context.lineTo(2.37, 15.22);
        context.bezierCurveTo(2.55, 15.74, 2.7, 16.29, 2.84, 16.86);
        context.lineTo(2.84, 16.86);
        context.bezierCurveTo(2.62, 17.38, 2.27, 17.84, 1.83, 18.2);
        context.lineTo(1.83, 18.16);
        context.bezierCurveTo(1.67, 17.31, 1.45, 16.46, 1.18, 15.63);
        context.lineTo(1.14, 15.38);
        context.lineTo(1.95, 6.33);
        context.lineTo(1.95, 6.34);
        context.bezierCurveTo(2.1, 7.8, 2.41, 9.23, 2.86, 10.63);
        context.lineTo(2.9, 10.8);
        context.bezierCurveTo(3.22, 12.31, 3.68, 13.79, 4.29, 15.21);
        context.lineTo(4.2, 15.01);
        context.bezierCurveTo(4.49, 16.37, 4.16, 17.78, 3.31, 18.87);
        context.bezierCurveTo(4.39, 24.96, 3.31, 46.69, 3.2, 49.22);
        context.lineTo(3.22, 49.25);
        context.bezierCurveTo(2.73, 48.55, 2.34, 47.81, 2.03, 47.02);
        context.bezierCurveTo(2.05, 45.61, 2.09, 44.19, 2.1, 42.72);
        context.lineTo(2.09, 42.73);
        context.bezierCurveTo(1.52, 43.65, 1.26, 44.74, 1.35, 45.82);
        context.lineTo(1.35, 45.79);
        context.bezierCurveTo(1.5, 47.07, 1.97, 48.29, 2.71, 49.34);
        context.lineTo(2.83, 49.52);
        context.lineTo(3.13, 49.94);
        context.lineTo(3.13, 49.94);
        context.lineTo(3.13, 49.94);
        context.lineTo(3.04, 49.82);
        context.bezierCurveTo(4.13, 51.27, 5.41, 52.55, 6.85, 53.63);
        context.lineTo(6.84, 53.65);
        context.bezierCurveTo(7.63, 54.07, 8.39, 54.52, 9.13, 55.02);
        context.lineTo(9.23, 55.09);
        context.lineTo(9.4, 55.21);
        context.bezierCurveTo(9.92, 55.56, 10.4, 55.93, 10.91, 56.3);
        context.lineTo(11.03, 56.38);
        context.lineTo(11.03, 56.38);
        context.bezierCurveTo(11.96, 57.09, 12.81, 57.8, 13.52, 58.38);
        context.bezierCurveTo(14.43, 58.38, 15.33, 58.45, 16.12, 58.53);
        context.lineTo(16.18, 58.58);
        context.bezierCurveTo(15.37, 57.97, 14.65, 57.25, 14.04, 56.44);
        context.lineTo(11.77, 56.38);
        context.lineTo(10.14, 55.09);
        context.lineTo(11.66, 55.09);
        context.lineTo(11.64, 55.04);
        context.bezierCurveTo(11.33, 54.13, 11.14, 53.19, 11.07, 52.23);
        context.lineTo(11.09, 52.33);
        context.bezierCurveTo(10.39, 53.5, 8.96, 54, 7.68, 53.54);
        context.bezierCurveTo(8.05, 53.64, 9.66, 53.88, 11.11, 50.84);
        context.lineTo(11.11, 50.84);
        context.lineTo(11.11, 50.88);
        context.bezierCurveTo(11.2, 49.55, 11.79, 48.29, 12.75, 47.36);
        context.lineTo(12.79, 47.31);
        context.bezierCurveTo(11.68, 49.39, 11.45, 51.83, 12.13, 54.08);
        context.lineTo(12.14, 54.1);
        context.bezierCurveTo(12.35, 54.36, 12.68, 54.52, 13.02, 54.52);
        context.lineTo(13.02, 54.51);
        context.bezierCurveTo(12.66, 53.62, 12.47, 52.66, 12.47, 51.7);
        context.bezierCurveTo(12.47, 46.12, 18.82, 41.55, 26.63, 41.55);
        context.bezierCurveTo(34.44, 41.55, 40.79, 46.12, 40.79, 51.74);
        context.lineTo(40.79, 51.69);
        context.bezierCurveTo(40.79, 52.66, 40.6, 53.62, 40.24, 54.52);
        context.lineTo(40.24, 54.52);
        context.bezierCurveTo(40.58, 54.52, 40.9, 54.37, 41.12, 54.1);
        context.lineTo(41.13, 54.08);
        context.bezierCurveTo(41.81, 51.83, 41.58, 49.39, 40.47, 47.31);
        context.lineTo(40.51, 47.36);
        context.bezierCurveTo(41.47, 48.29, 42.06, 49.55, 42.15, 50.88);
        context.lineTo(42.15, 50.84);
        context.bezierCurveTo(43.6, 53.84, 45.21, 53.64, 45.6, 53.53);
        context.lineTo(45.61, 53.52);
        context.bezierCurveTo(44.34, 54.01, 42.91, 53.53, 42.19, 52.38);
        context.lineTo(42.16, 52.44);
        context.bezierCurveTo(42.08, 53.38, 41.87, 54.31, 41.55, 55.21);
        context.lineTo(43.11, 55.09);
        context.lineTo(41.48, 56.38);
        context.lineTo(39.24, 56.38);
        context.lineTo(39.22, 56.41);
        context.bezierCurveTo(38.62, 57.23, 37.91, 57.97, 37.11, 58.6);
        context.bezierCurveTo(37.93, 58.5, 38.83, 58.43, 39.74, 58.42);
        context.bezierCurveTo(40.44, 57.8, 41.29, 57.09, 42.23, 56.42);
        context.lineTo(42.23, 56.42);
        context.lineTo(42.35, 56.34);
        context.bezierCurveTo(42.84, 55.97, 43.35, 55.61, 43.86, 55.25);
        context.lineTo(44.03, 55.13);
        context.lineTo(44.03, 55.13);
        context.lineTo(44.14, 55.06);
        context.bezierCurveTo(44.87, 54.56, 45.63, 54.11, 46.41, 53.69);
        context.lineTo(46.35, 53.72);
        context.bezierCurveTo(47.79, 52.63, 49.08, 51.35, 50.16, 49.9);
        context.lineTo(50.09, 50);
        context.lineTo(50.09, 50);
        context.lineTo(50.39, 49.58);
        context.lineTo(50.49, 49.43);
        context.lineTo(50.51, 49.4);
        context.bezierCurveTo(51.25, 48.35, 51.72, 47.13, 51.87, 45.85);
        context.lineTo(51.87, 45.88);
        context.bezierCurveTo(51.96, 44.8, 51.7, 43.71, 51.13, 42.79);
        context.bezierCurveTo(51.12, 44.25, 51.17, 45.68, 51.22, 46.99);
        context.lineTo(51.2, 47.05);
        context.bezierCurveTo(50.88, 47.83, 50.47, 48.58, 49.97, 49.26);
        context.bezierCurveTo(49.86, 46.69, 48.81, 24.97, 49.89, 18.87);
        context.lineTo(49.88, 18.85);
        context.bezierCurveTo(49.04, 17.75, 48.74, 16.33, 49.05, 14.98);
        context.lineTo(49.03, 15.04);
        context.bezierCurveTo(49.64, 13.61, 50.11, 12.11, 50.44, 10.58);
        context.lineTo(50.43, 10.62);
        context.bezierCurveTo(50.88, 9.23, 51.19, 7.8, 51.34, 6.34);
        context.lineTo(52.15, 15.38);
        context.lineTo(52.15, 15.51);
        context.lineTo(52.11, 15.63);
        context.bezierCurveTo(51.84, 16.46, 51.62, 17.31, 51.46, 18.16);
        context.lineTo(51.46, 18.2);
        context.bezierCurveTo(51.02, 17.84, 50.67, 17.38, 50.45, 16.86);
        context.bezierCurveTo(50.59, 16.29, 50.74, 15.74, 50.92, 15.22);
        context.lineTo(50.75, 13.34);
        context.bezierCurveTo(50.4, 14.4, 50.05, 15.22, 50.02, 15.29);
        context.lineTo(50.03, 15.26);
        context.bezierCurveTo(49.85, 16.01, 49.94, 16.79, 50.28, 17.48);
        context.lineTo(50.29, 17.51);
        context.bezierCurveTo(50.52, 18.07, 50.87, 18.58, 51.31, 18.99);
        context.lineTo(51.28, 18.96);
        context.bezierCurveTo(51.71, 19.42, 52.19, 19.83, 52.7, 20.18);
        context.lineTo(53.05, 20.39);
        context.lineTo(52.94, 20.74);
        context.bezierCurveTo(52.11, 23.45, 51.2, 40.37, 51.2, 40.37);
        context.bezierCurveTo(51.2, 40.63, 51.2, 40.89, 51.2, 41.14);
        context.lineTo(51.19, 41.13);
        context.bezierCurveTo(52.4, 42.38, 53.03, 44.1, 52.9, 45.84);
        context.lineTo(52.9, 45.92);
        context.bezierCurveTo(52.72, 47.33, 52.21, 48.68, 51.39, 49.85);
        context.bezierCurveTo(51.45, 50.67, 51.55, 51.5, 51.6, 52.23);
        context.lineTo(51.78, 52.23);
        context.bezierCurveTo(52.78, 52.15, 53.61, 52.69, 53.2, 53.38);
        context.lineTo(53.2, 53.37);
        context.bezierCurveTo(52.96, 53.79, 52.54, 54.07, 52.07, 54.14);
        context.lineTo(52.07, 54.14);
        context.bezierCurveTo(52.28, 53.99, 52.45, 53.8, 52.56, 53.57);
        context.bezierCurveTo(52.67, 53.38, 52.56, 53.29, 52.47, 53.25);
        context.lineTo(52.22, 53.25);
        context.lineTo(52.22, 53.25);
        context.lineTo(51.67, 53.25);
        context.bezierCurveTo(51.79, 54.77, 51.88, 55.69, 51.89, 55.74);
        context.lineTo(51.97, 56.45);
        context.lineTo(43.87, 56.45);
        context.bezierCurveTo(42.87, 57.14, 42, 57.86, 41.22, 58.52);
        context.lineTo(41.26, 58.52);
        context.bezierCurveTo(42.91, 58.49, 44.53, 58.99, 45.88, 59.93);
        context.lineTo(44, 60.56);
        context.lineTo(44, 60.56);
        context.lineTo(44.12, 60.51);
        context.bezierCurveTo(42.99, 61.01, 41.81, 61.41, 40.6, 61.69);
        context.lineTo(40.49, 61.71);
        context.lineTo(40.27, 61.71);
        context.lineTo(40.11, 61.71);
        context.bezierCurveTo(33.76, 62.81, 33.11, 62.2, 33.11, 62.2);
        context.lineTo(33.15, 62.2);
        context.bezierCurveTo(34.79, 62.17, 36.36, 61.54, 37.56, 60.42);
        context.lineTo(37.72, 60.26);
        context.bezierCurveTo(37.79, 60.2, 38.13, 59.85, 38.72, 59.34);
        context.lineTo(37.54, 59.42);
        context.lineTo(37.54, 59.42);
        context.lineTo(37.25, 59.42);
        context.lineTo(37.25, 59.42);
        context.bezierCurveTo(36.98, 59.45, 36.71, 59.51, 36.44, 59.58);
        context.bezierCurveTo(36.29, 59.57, 36.1, 59.67, 35.9, 59.75);
        context.lineTo(35.81, 59.75);
        context.lineTo(35.78, 59.76);
        context.bezierCurveTo(35.57, 59.84, 35.37, 59.94, 35.17, 60.05);
        context.lineTo(35.11, 60.04);
        context.lineTo(35.14, 60.02);
        context.bezierCurveTo(34.96, 60.13, 34.79, 60.24, 34.64, 60.37);
        context.lineTo(34.46, 60.52);
        context.lineTo(34.46, 60.52);
        context.bezierCurveTo(34.27, 60.69, 34.1, 60.88, 33.96, 61.09);
        context.lineTo(28.78, 61.67);
        context.lineTo(28.78, 61.67);
        context.lineTo(28.8, 61.67);
        context.bezierCurveTo(27.37, 61.84, 25.94, 61.84, 24.51, 61.67);
        context.lineTo(24.53, 61.67);
        context.lineTo(19.34, 61.08);
        context.lineTo(19.34, 61.09);
        context.bezierCurveTo(19.2, 60.88, 19.04, 60.69, 18.85, 60.52);
        context.lineTo(18.69, 60.38);
        context.lineTo(18.71, 60.4);
        context.bezierCurveTo(18.56, 60.27, 18.39, 60.15, 18.22, 60.04);
        context.lineTo(18.11, 60.01);
        context.lineTo(18.13, 60.02);
        context.bezierCurveTo(17.93, 59.91, 17.72, 59.81, 17.5, 59.73);
        context.lineTo(17.36, 59.72);
        context.bezierCurveTo(17.16, 59.65, 16.97, 59.59, 16.79, 59.55);
        context.lineTo(16.8, 59.55);
        context.bezierCurveTo(16.54, 59.49, 16.28, 59.44, 16.01, 59.41);
        context.lineTo(15.75, 59.41);
        context.lineTo(15.75, 59.41);
        context.lineTo(14.57, 59.33);
        context.bezierCurveTo(15.12, 59.84, 15.46, 60.19, 15.57, 60.25);
        context.lineTo(15.73, 60.41);
        context.lineTo(15.73, 60.41);
        context.bezierCurveTo(16.93, 61.53, 18.5, 62.16, 20.14, 62.19);
        context.bezierCurveTo(20.18, 62.19, 19.52, 62.79, 13.18, 61.7);
        context.lineTo(13.02, 61.7);
        context.lineTo(12.8, 61.7);
        context.lineTo(12.8, 61.7);
        context.lineTo(12.69, 61.67);
        context.bezierCurveTo(11.48, 61.4, 10.3, 61, 9.17, 60.5);
        context.lineTo(9.29, 60.55);
        context.lineTo(7.48, 59.83);
        context.lineTo(7.45, 59.85);
        context.bezierCurveTo(8.8, 58.9, 10.42, 58.41, 12.07, 58.44);
        context.bezierCurveTo(11.33, 57.78, 10.42, 57.06, 9.46, 56.37);
        context.lineTo(1.34, 56.37);
        context.lineTo(1.42, 55.66);
        context.bezierCurveTo(1.42, 55.61, 1.52, 54.66, 1.64, 53.17);
        context.lineTo(1.09, 53.17);
        context.lineTo(1.09, 53.17);
        context.lineTo(0.84, 53.17);
        context.bezierCurveTo(0.73, 53.17, 0.64, 53.31, 0.75, 53.5);
        context.lineTo(0.75, 53.49);
        context.bezierCurveTo(0.86, 53.72, 1.03, 53.91, 1.24, 54.06);
        context.lineTo(1.25, 54.06);
        context.bezierCurveTo(0.79, 53.99, 0.38, 53.72, 0.13, 53.32);
        context.bezierCurveTo(-0.3, 52.62, 0.56, 52.07, 1.54, 52.15);
        context.moveTo(3, 9);
        context.lineTo(3.03, 9.08);
        context.bezierCurveTo(2.53, 7.55, 2.19, 5.98, 2.03, 4.38);
        context.lineTo(2, 3.83);
        context.lineTo(2.41, 3.7);
        context.bezierCurveTo(3.41, 3.4, 6.14, 2.19, 6.14, 0.64);
        context.lineTo(6.14, 0);
        context.lineTo(47.07, 0);
        context.lineTo(47.07, 0.64);
        context.bezierCurveTo(47.07, 2.2, 49.83, 3.4, 50.79, 3.7);
        context.lineTo(51.2, 3.83);
        context.lineTo(51.2, 4.11);
        context.lineTo(51.21, 3.93);
        context.bezierCurveTo(51.1, 5.54, 50.82, 7.12, 50.38, 8.67);
        context.lineTo(50, 4.8);
        context.bezierCurveTo(48.93, 4.41, 46.34, 3.27, 45.86, 1.29);
        context.lineTo(7.4, 1.29);
        context.bezierCurveTo(6.92, 3.29, 4.33, 4.41, 3.26, 4.8);
        context.lineTo(3, 9);
        context.closePath();
        context.fillStyle = black;
        context.fill();
        
        context.restore();

    }

    //// Infrastructure

    function clearCanvas(canvas) {
        canvas = initializeCanvas(typeof canvas === 'string' ? document.getElementById(canvas) : canvas);
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    }

    // Possible arguments for 'resizing' parameter are:
    //   'aspectfit': The content is proportionally resized to fit into the target rectangle.
    //   'aspectfill': The content is proportionally resized to completely fill the target rectangle.
    //   'stretch': The content is stretched to match the entire target rectangle.
    //   'center': The content is centered in the target rectangle, but it is NOT resized.
    function applyResizingBehavior(resizing, rect, targetRect) {
        if (targetRect === undefined || equalRects(rect, targetRect) || equalRects(targetRect, makeRect(0, 0, 0, 0))) {
            return rect;
        }

        var scales = makeSize(0, 0);
        scales.w = Math.abs(targetRect.w / rect.w);
        scales.h = Math.abs(targetRect.h / rect.h);

        switch (resizing) {
            case 'aspectfit': {
                scales.w = Math.min(scales.w, scales.h);
                scales.h = scales.w;
                break;
            }
            case 'aspectfill': {
                scales.w = Math.max(scales.w, scales.h);
                scales.h = scales.w;
                break;
            }
            case 'stretch':
            case undefined:
                break;
            case 'center': {
                scales.w = 1;
                scales.h = 1;
                break;
            }
            default:
                throw 'Unknown resizing behavior "' + resizing + '". Use "aspectfit", "aspectfill", "stretch" or "center" as resizing behavior.';
        }

        var result = makeRect(Math.min(rect.x, rect.x + rect.w), Math.min(rect.y, rect.y + rect.h), Math.abs(rect.w), Math.abs(rect.h));
        result.w *= scales.w;
        result.h *= scales.h;
        result.x = targetRect.x + (targetRect.w - result.w) / 2;
        result.y = targetRect.y + (targetRect.h - result.h) / 2;
        return result;
    }

    function makeRect(x, y, w, h) {
        return { x: x, y: y, w: w, h: h };
    }

    function equalRects(r1, r2) {
        return r1.x === r2.x && r1.y === r2.y && r1.w == r2.w && r1.h === r2.h;
    }

    function makeSize(w, h) {
        return { w: w, h: h };
    }

    function initializeCanvas(canvas) {
        if ('paintCodePixelRatio' in canvas) return canvas;
        // This function should only be called once on each canvas.
        var context = canvas.getContext('2d');

        var devicePixelRatio = window.devicePixelRatio || 1;
        var backingStorePixelRatio = context.webkitBackingStorePixelRatio
            || context.mozBackingStorePixelRatio
            || context.msBackingStorePixelRatio
            || context.oBackingStorePixelRatio
            || context.backingStorePixelRatio
            || 1;

        var pixelRatio = devicePixelRatio / backingStorePixelRatio;

        canvas.style.width = canvas.width + 'px';
        canvas.style.height = canvas.height + 'px';
        canvas.width *= pixelRatio;
        canvas.height *= pixelRatio;
        canvas.paintCodePixelRatio = pixelRatio;

        context.scale(pixelRatio, pixelRatio);
        return canvas;
    }

    //// Public Interface

    // Drawing Methods
    AttributeBlock.drawAttribute_Block = drawAttribute_Block;

    // Utilities
    AttributeBlock.clearCanvas = clearCanvas;
    AttributeBlock.makeRect = makeRect;

})();

#include "DHT.h"
#define DHTPIN 2          // esta en el pi digital 2
#define DHTTYPE DHT22    
DHT dht(DHTPIN, DHTTYPE);
/*variables necesariar para le sensor de CO2*/
#define         MG_PIN                       (2)     //define which analog input channel you are going to use
#define         DC_GAIN                      (3)   //(8.5)   //define the DC gain of amplifier
#define         READ_SAMPLE_INTERVAL         (1)    //define how many samples you are going to take in normal operation
#define         READ_SAMPLE_TIMES            (1)     //define the time interval(in milisecond) between each samples in 
#define         ZERO_POINT_VOLTAGE           (1.74)  //(0.220) //define the output of the sensor in volts when the concentration of CO2 is 400PPM
#define         REACTION_VOLTGAE             (0.020)


float           CO2Curve[3]  =  {2.602,ZERO_POINT_VOLTAGE,(REACTION_VOLTGAE/(2.602-3))};
int gas1sen = A3;
int gas2sen = A4;
int gas1,gas2 = 0;



void setup()
{
    Serial.begin(9600);                              //UART setup, baudrate = 9600bps
  dht.begin();
    
 }
void loop() {
  while( Serial.available() == 0);
  
  char data = Serial.read();
  Serial.print(data);
  
  
  if  (data == '#')  
  {
    
    Serial.print("#");
    Serial.print('T');
    float t = dht.readTemperature();
    float h = dht.readHumidity();
    Serial.print(t);
    Serial.print(',');
    Serial.print('H');
    Serial.print(h);
    Serial.print(',');
    Serial.print('A');
    gas1 = map(analogRead(gas1sen), 0, 1023, 0, 1023);
    Serial.print(gas1); 
    Serial.print(',');
    Serial.print('B');
    int percentage;
    float volts;
    volts = MGRead(MG_PIN);
    percentage = MGGetPercentage(volts,CO2Curve);
    if (percentage == -1) {
        Serial.print( "400" );
    } else {
        Serial.print(percentage);
    }
    Serial.print(',');
    Serial.print('C');
    gas2 = map(analogRead(gas2sen), 0, 1023, 0, 1023);
    Serial.println(gas2);
    Serial.flush();
  }
 if  (data == '$')  
  {
    
    Serial.print("$");
    Serial.print('T');
    float t = dht.readTemperature();
    float h = dht.readHumidity();
    Serial.print(t);
    Serial.print(',');
    Serial.print('H');
    Serial.print(h);
    Serial.print(',');
    Serial.print('A');
    gas1 = map(analogRead(gas1sen), 0, 1023, 0, 1023);
    Serial.print(gas1); 
    Serial.print(',');
    Serial.print('B');
    int percentage;
    float volts;
    volts = MGRead(MG_PIN);
    percentage = MGGetPercentage(volts,CO2Curve);
    if (percentage == -1) {
        Serial.print( "400" );
    } else {
        Serial.print(percentage);
    }
    Serial.print(',');
    Serial.print('C');
    gas2 = map(analogRead(gas2sen), 0, 1023, 0, 1023);
    Serial.println(gas2);
    Serial.flush();
  }
}

  float MGRead(int mg_pin)
{
    int i;
    float v=0;
    for (i=0;i<READ_SAMPLE_TIMES;i++) {
        v += analogRead(mg_pin);
        }
        v = (v/READ_SAMPLE_TIMES) *5/1024 ;
    return v;  
}
 
int  MGGetPercentage(float volts, float *pcurve)
{
   if ((volts/DC_GAIN )>=ZERO_POINT_VOLTAGE) {
      return -1;
   } else { 
      return pow(10, ((volts/DC_GAIN)-pcurve[1])/pcurve[2]+pcurve[0]);
   }
}



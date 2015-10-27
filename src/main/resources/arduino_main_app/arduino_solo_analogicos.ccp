int tempsen = A0;
int humsen  = A1;
int gas1sen = A2;
int gas2sen = A3;
int gas3sen = A4;
int temperatura,humedad,gas1,gas2,gas3 = 0;

void setup()
{
  Serial.begin(9600);
}

void loop()
{
 
  while( Serial.available() == 0);
  char data = Serial.read();
  if  (data == '#')   //# COM10 #  COM11 $
  {

    int temperatura = map(analogRead(tempsen), 0, 1023, 0, 1000);
    int humedad = map(analogRead(humsen), 0, 1023, 0, 1000);
    int gas1 = map(analogRead(gas1sen), 0, 1023, 0, 1023);
    int gas2 = map(analogRead(gas2sen), 0, 1023, 0, 1023);
    int gas3 = map(analogRead(gas3sen), 0, 1023, 0, 1023);
  
  
   Serial.print(temperatura);
   Serial.print(',');
   Serial.print(humedad);
    Serial.print(',');
    Serial.print(gas1);
    Serial.print(',');
    Serial.print(gas2);
    Serial.print(',');
    Serial.println(gas3);
    Serial.flush();
  }
  else{ 
       Serial.flush();
 }
  Serial.flush();
}



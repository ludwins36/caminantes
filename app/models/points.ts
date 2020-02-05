import { Ubicacion } from './ubicacion';
import { Sectores } from './sectores';
import { Horarys } from './horarys';

export class Points {
   ubication : Ubicacion = new Ubicacion();
   sectores : Sectores = new Sectores();
   horarys : Horarys = new Horarys;
   capacidad : Number;
   img : string;
   propietario : string;
   organizacion : string;
   orgName : string;
   status : string;
   multisector : boolean = false;
   active : boolean = true;

   
}

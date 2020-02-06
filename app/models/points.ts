import { Ubicacion } from './ubicacion';
import { Sectores } from './sectores';
import { Horarys } from './horarys';
import { Grupos } from './grupos';
import { Contact } from './contact';

export class Points {
   title : string;
   desc : string;
   ubication : Ubicacion = new Ubicacion();
   sectores : Sectores = new Sectores();
   contact : Contact = new Contact();
   grupo : Grupos = new Grupos();
   horarys : Horarys = new Horarys;
   capacidad : Number;
   oferta : Number;
   img : string;
   propietario : string;
   organizacion : string;
   orgName : string;
   status : string;
   multisector : boolean = false;
   active : boolean = true;
   borrador : boolean;
 
   
}

import { Alert,ToastAndroid,I18nManager,Platform,NativeModules} from "react-native";
import { localStorage }  from './localStorageProvider';
import AsyncStorage  from "@react-native-community/async-storage";
import { config } from "./configProvider";

global.language_key=1;
class Language_provider {
   
language_get=async()=>{
  const deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
        : NativeModules.I18nManager.localeIdentifier;

    console.log(deviceLanguage.split("_")); //en_US
    var item =await AsyncStorage.getItem('language');
    console.log('check launguage option',item)
     let  detectlang=deviceLanguage.split("_")
   if(item!=null)
      {
        console.log('kya bat h vikas bhai',config.language)  
        config.language=item;
     }
     else if(detectlang!==undefined)
        {
          if(detectlang[0]=="pt")
          {
          // alert('jjfdjskdj')
          config.language=2
         }
         else if(detectlang[0]=="es")
         {
          config.language=1
         }
      }
     
   	
       console.log('language_key123',config.language)  
   }
 language_set=(value)=>{
     config.language=value;
    localStorage.setItemObject('language',value)
    }
    cancel=['Cancel','cancelar','cancelar']
    Yes=['Yes','si','sim']
    No=['No','No','Não']
    ok=['ok','Okay','Está bem']
    save=['Save','Guardar','Salve']
    Done=['Done','Hecho','Feita']
    Confirm=["Confirm",'Confirmar','confirme']
    Save=['Save','Guardar','Salve ']
    Skip=['Skip','Omitir','Pular']
    Clear=['Clear','Clara','Clara']
    questionsave=['Save','Que te gusta','Que te gusta']

//___________________________________________
send_gift=['Send Gift','Enviar regalo','Enviar presente']
gift_heading =['will send your messages first','enviará sus mensajes primero','irá enviar suas mensagens primeiro'];
gift_heading1  =['if you send gift,','si envias un regalo,','se você mandar um presente,']  ;
gifttitle=['Gift','Regalo','Presente'];
modalgiftheading=['Send a gift,you will surely receive a message','Envía un regalo, seguro recibirás un mensaje','Mande um presente, com certeza você receberá uma mensagem'];
modalgetcoin=['Get coin','Obtener moneda','Pegue moeda'];
All_Gift =['All Gift','Todo regalo','Todos os presentes']
giftalert=['GIFT SEND','REGALO ENVIAR','ENVIAR PRESENTE'];
My_Gift =['My Gift','Mi regalo','Meu presente']
giftvalidation=['Do you wand to send this gift','¿Quieres enviar este regalo?','Você usa a varinha para enviar este presente'];
//----------------------------------

Coinpurchse=['Coin','Moneda','Moeda'];
coinmessage=['Do you want to purchase this coin','¿Quieres comprar esta moneda?','Você quer comprar esta moeda?']
addcoin=['please add coins','por favor agregue monedas','por favor adicione moedas']
coinvalidation=['Do you want to purchase this coin','¿Quieres comprar esta moneda?','Você quer comprar esta moeda?']
Coin=['COIN','MONEDA','MOEDA'];
   //--------------------open camera option-----------------//
   titlecamera=['Select a Photo','Seleccionar una foto','Selecione uma foto']
   takephot=['Take Photo..','Tomar foto..','Tirar fotos..']
   chooselib=['Choose from Library','Elige de la biblioteca','Escolha da Biblioteca']

   //------------social login page----------------//
    continuefacebook=['Continue With Facebook','Continuar con Facebook','Continue com o Facebook']
    continuegoogle=['Continue With Google','Continuar con Google','Continue com o Google'] 
    continuephone=['Continue With Phone','Continuar con el teléfono','Continue com o telefone'] 
    Bycontinueagree=['By Continueing, agree to our','Al continuar, acepta nuestra','Ao continuar, concorde com nossos'] 
    termscondition=['terms and conditions','Términos y condiciones','termos e Condições']
    and=['and','y','e']
    privacypolicy=['privacy policy','política de privacidad','política de Privacidade']
//-------------------------login page start------------------------------//
  login=['Login','Iniciar sesión','Conecte-se']
  signup=['Signup','Regístrate','Inscrever-se']
  Phonenumber=['Phone Number','Número de teléfono','Número de telefone']
  password=['Password','Contraseña','Senha']
  forgotpassword=['Forgot Password?','¿Has olvidado tu contraseña?','Esqueceu sua senha?']
  validation_phone=['Please enter phone','Por favor ingrese el teléfono','Por favor insira o telefone']
  validation_phone_valid =['Please enter valid phone','Ingrese un teléfono válido','Por favor insira um telefone válido']
 validation_password=['Please enter password','Por favor, ingrese contraseña','Por favor insira a senha']
 validation_password_length=['password length should be minimum 6 character','la longitud de la contraseña debe tener un mínimo de 6 caracteres','o comprimento da senha deve ter no mínimo 6 caracteres']
 accounttext=['You Dont have an account?','¿No tienes una cuenta?','Você não tem uma conta?']
  //-------------------------login phone number page------------------------------//
  headingtitle=["What's Your Phone Number",'Cuál es tu número de teléfono','Qual é o seu número de telefone']
  phonenumbersing=["Enter Phone Number",'Ingresar número telefónico','Digite o número do telefone']
  continue=['Continue','Seguir','Continuar']
  accounttextsing=['You Dont have an account?','¿No tienes una cuenta?','Você não tem uma conta?']
  loginsing=['Login','Iniciar sesión','Conecte-se']
  validation_phone_sign=['Please enter phone','Por favor ingrese el teléfono','Por favor insira o telefone']
  validation_phone_valid_sign =['Please enter valid phone','Ingrese un teléfono válido','Por favor insira um telefone válido']
  //-------------------------------------forgot password-----------------------//
  titleforgotpass=['Forgot Password','Has olvidado tu contraseña','Esqueceu sua senha']
  enterforgot=['Phone Number','Número de teléfono','Número de telefone']
  continueforgot=['Continue','Seguir','Continuar']
  fogotvalidation=['Please enter phone','Por favor ingrese el teléfono','Por favor insira o telefone']
  forgotvalidationlength=['Please enter valid phone','Ingrese un teléfono válido','Por favor insira um telefone válido']
  
  
  
  //-------------------otp section-------------------------//
  verificationotp=['Verification','Verificación','Verificação']
  verificationcodeheding=['Please type the verification code sent to','Escriba el código de verificación enviado a','Digite o código de verificação enviado para']
  phoneotp=['Phone','Teléfono','telefone']
  OTP=['OTP','OTP','OTP']
  resend=['Resend','Reenviar','Reenviar']
  verify=['Verify','Verificar','Verificar']
  edit=['Edit','Editar','Editar']
  validationotp=['Please enter OTP','Ingrese OTP','Por favor, insira OTP']
  //--------------------------enter name screen------------------------//
  titlename=['Whats Your Name?','¿Cuál es tu nombre?','Qual o seu nome?']
  entername=['Enter Name','Ingrese su nombre','Insira o nome']
  continuename=['Continue','Seguir','Continuar']
  validataionname=['Please enter name','Por favor ingrese el nombre','Por favor insira o nome']
  backheading=['Back App','Atrás Aplicación','Back App']
  backmessage=['Do you want to Back','Quieres volver','Você quer voltar']
  //--------------------------enter user name screen------------------------//
  titleusername=['Whats Your Username?','¿Cual es tu nombre de usuario?','Qual o seu nome de usuário?']
  enterusername=['Monoj0002','Monoj0002','Monoj0002']
  continueusername=['Continue','Seguir','Continuar']
  validataionusername=['Please enter name','Por favor ingrese el nombre','Por favor insira o nome']
  validataionusernamevlid=['Please enter valid name','Ingrese un nombre válido','Por favor insira um nome válido']
 //----------------------------set a password-----------------------//
 titlepassword=['Set A Password','Establecer una contraseña','Definir uma senha']
 enterenterpassword=['Enter Password','Introducir la contraseña','Digite a senha']
 passwordcharacter=['Password must be 6-15 characters','La contraseña debe tener entre 6 y 15 caracteres','A senha deve ter de 6 a 15 caracteres']
 continuepassword=['Continue','Seguir','Continuar']
 validationpassword=['Please enter password','Por favor, ingrese contraseña','Por favor insira a senha']
 validationlengthpassword=['Password limit should be minimum 6 characters','El límite de la contraseña debe tener un mínimo de 6 caracteres','O limite de senha deve ser de no mínimo 6 caracteres']
 //----------------------------Enter birthday-----------------------//
 titlebirthday=['When Is Your Birthday','Cuando es tu cumpleaños','Quando é seu aniversário']
 enterdate=['Select Date','Seleccione fecha','Selecione a data']
 continuedate=['Continue','Seguir','Continuar']
//------------------------------choose location----------------------//
titlelocation=['Choose Your Location','Selecciona tu ubicación','Escolha a sua localização']
enterlocation=['Search Location','Ubicación de búsqueda','Localização de pesquisa']
continuelocation=['Continue','Seguir','Continuar']
validationlocation=['Please select address','Por favor seleccione dirección','Selecione o endereço']
//--------------------------search location--------------------------//
titlesearchlocation=['Search location','Ubicación de búsqueda','Localização de busca']
Updatelocation=['Update','Actualizar','Atualizar']
//-----------------------------enter gender page-----------------------------//
titlegender=["I'm a..",'Soy una','Eu sou um']
titlemeetlike=["And I'd Like To Meet",'Y me gustaría conocer','E eu gostaria de conhecer']
continuegender=['Continue','Seguir','Continuar']
Malegender=['Male','Masculina','Masculina']
Femalegender=['Female','Hembra','Fêmea']
Bothgender=['Both','Ambas','Ambas']
validationgender=['Please select gender','Por favor seleccione el género','Por favor selecione um gênero']
vlaidationmeet=['Please select meeting gender','Seleccione el género de la reunión','Selecione o gênero da reunião']
//-----------------------------------about page----------------------------------//
titleabout=['Write A Bit Bit About Yourself','Escribe un poco sobre ti','Escreva um pouco sobre você']
enterabout=['About Yourself','Acerca de ti mismo','Sobre si mesmo']
continueabout=['Continue','Seguir','Continuar']
validationabout=['Please enter about yourself','Por favor ingrese sobre usted','Por favor, informe sobre você']
//----------------------------------add photo page----------------------------------------//
titlephoto=["Almost Done! Let's Add A Photo",'Casi termino! Agreguemos una foto','Quase pronto! Vamos adicionar uma foto']
continuephoto=['Continue','Seguir','Continuar']
validataionphoto=['Please select image','Por favor seleccione imagen','Selecione a imagem']
removeimage=['Remove Image','Quita la imagen','Remover imagem']
changename=['please change username','por favor cambie el nombre de usuario','por favor mude o nome de usuário']
UserName=['UserName','Nombre de usuario','Nome do usuário']
//-----------------------------welcome page----------------------------//
titleWelcome=['Welcome','Bienvenidas','Bem-vinda']
headingwelcome=['Your sign up is completed','Tu registro está completo','Sua inscrição foi concluída']
continuewelcome=['Continue','Seguir','Continuar']
//------------------------My profile page----------------------------//
titleprofile=['My Profile','Mi perfil','Meu perfil']
storyprofile=['Stories','Cuentos','Histórias']
likeprofile=['Liked','Gustó','Gostou']
friendprofile=['Friend','Amiga','Amiga']
accountprofile=['Verify your account','Verifica tu cuenta','Verifique sua conta']
Becomevip=['Become VIP','Conviértete en VIP','Torne-se VIP']
yourBecomevip=['your vip','tu vip','seu vip'];

//--------------------------setting page----------------------------------//
titlesetting=['Setting','Ajuste','Configuração']
notificationsetting=['Notification','Notificación','Notificação']
editsetting=['Edit Profile','Editar perfil','Editar Perfil']
passwordchangesetting=['Change Password','Cambia la contraseña','Alterar a senha']
changelanguage=['Change Language','Cambiar idioma','Mudar idioma']
changeusername=['Change Username','Cambie el nombre de usuario','Mudar nome de usuário']
changelocation=['Change Location','Cambiar locación','Mudar localização']
blockuser=['Block User','Bloquear usuario','Bloquear usuário']
Moresettin=['More','Más','Mais']
tearmsetting=['Terms & Conditions','Términos y condiciones','termos e Condições']
privacy=['Privacy Policies','Políticas de privacidad','Políticas de privacidade']
aboutsetting=['About','Acerca de','Sobre']
helpsetting=['Help/Contact Us','Ayuda / Contáctanos','Ajuda / Fale conosco']
sharesetting=['Share','Compartir','Compartilhar']
rateus=['Rate Us','Nos califica','Nos avalie']
logout=['Logout','Cerrar sesión','Sair']
deleteaccount=['Delete Account','Borrar cuenta','Deletar conta']
logoutvalidation=['Are you sure you want to logout?','¿Estás seguro de que quieres cerrar la sesión?','Tem certeza que deseja sair']
//--------------------------edit profile page----------------------------------//
editprofiletitle=['Edit Profile','Editar perfil','Editar Perfil']
addeditmore=['Add more photo','Agregar más foto','Adicionar mais foto']
verifiationedit=['Verification','Verificación','Verificação']
verificationheadingedit=['Verify your account with any one option and prove to other members that your are real',
'Verifique su cuenta con cualquier opción y demuestre a otros miembros que usted es real',
'Verifique sua conta com qualquer uma das opções e prove aos outros membros que você é real'
]
googleedit=['Google','Google','Google']
Verifiededit=['Verified','Verificada','Verificada']
facebookedit=['Facebook','Facebook','Facebook']
phoneedit=['Phone','Teléfono','telefone']
basicinfo=['Basic info','Información básica','Información básica']
Nameedit=['Name','Nombre','Nome']
genderedit=['Gender','Género','Gênero']
birthdateedit=['Birth date','Fecha de nacimiento','Data de nascimento']
aboutmeedit=['About me','Sobre mí','Sobre mim']
workheadingedit=['Work & Education','Trabajo y educación','Trabalho e Educação']
workedit=['Work','Trabajo','Trabalhos']
educationedit=['Education','Educación','Educação']
moreaboutheading=['More about me','Más sobre mí','Mais sobre mim']
intretedin=['Intersted in','Interesada en','Interessado em']
lookingforedit=['Looking for','Buscando','Procurando por']
eyecoloredit=['Eye color','Color de los ojos','Cor dos olhos']
haircolor=['Hair color','Color de pelo','Cor de cabelo']
heightcolor=['Height','Altura','Altura']
relationshipedit=['Relationship status','Estado civil','Status de relacionamento']
fevouriteedit=['Favourite Tv show','Programa de televisión favorito','Programa de TV favorito']
favouritebookedit=['Favourite Book','Libro favorito','Livro favorito']
favouritemovieedit=['Favourite Movies','Películas favoritas','Filmes favoritos']
favouritemusicedit=['Favourite Music','Música favorita','Música favorita']
Tagsheadingedit=['Tags','Etiquetas','Tag']
tagssubheading=["Choose upto 6 tags! don't get lost under the clitter show who you are.",
"¡Elija hasta 6 etiquetas! no te pierdas bajo el desorden, muestra quién eres.",
"Escolha até 6 tags! não se perca sob o show clitter quem você é."]
addtagsedit=['Add Tags','Agregar etiquetas','Adicionar Tags']
questionheadingedit=['Questions','Preguntas','Questões']
addanotherone=['Add another one','Agregar otro','Adicione outro']
removeextraimage=['You can add only 10 product photo. remove extra one','Puede agregar solo 10 fotos de productos. quitar uno extra',
'Você pode adicionar apenas 10 fotos do produto. remova um extra'
]
delemeimagemessage=["Do you want to delete photo?",'¿Quieres borrar la foto?','Você quer deletar a foto?']
questionaddmessage=['Do you want to delete this question?','¿Quieres eliminar esta pregunta?','Você quer deletar esta questão?']
//-----------------------------Basic info---------------------------------//
titlebasicinfo=['Basic info','Información básica','Informação básica']
namebasic=['Name','Nombre','Nome']
titlegenderbasic=["I'm a..",'Soy una','Eu sou um']
Malegender=['Male','Masculina','Masculina']
Femalegender=['Female','Hembra','Fêmea']
dateslectbasic=['Select Date','Seleccione fecha','Selecione a data']
aboutbasictitle=['About Yourself','Acerca de ti mismo','Sobre si mesmo']
validationbasic=['Please fill any one option','Por favor complete una opción','Por favor, preencha qualquer uma das opções']
//------------------------------work page--------------------------------------//
titlework=['Work','Trabajo','Trabalhos']
enterwork=['Enter Work','Entrar en el trabajo','Entrar no Trabalho']
validationwork=['Please enter work','Por favor ingrese al trabajo','Por favor, entre no trabalho']
//--------------------------loking for-------------------------------------------//
titlelookingfor=['Looking for','Buscando','Procurando por']
validationlooking=['Please select looking for','Por favor seleccione buscando','Por favor, selecione procurando']
//----------------------------------education page-------------------------------//
validationeducation=['Please select education','Seleccione educación','Selecione a educação']
titleeducation=['Education','Educación','Educação']
//----------------------------------intresteed in page -------------------------------//
validationinterest=['Please select your intrest','Acerca de ti mismo','Sobre si mesmo']
titleinterest=['Intrested','Interesado','Interessada']
//------------------------------------eye color--------------------------///
 titleeyecolor=['Eye Color','Color de los ojos','Cor dos olhos']
 validationeyecolor=['Please select eye color','Seleccione el color de ojos','Selecione a cor dos olhos']
//------------------------------------hair color--------------------------///
validationhaircolor=['Please select hair color','Seleccione el color de cabello','Selecione a cor do cabelo']
titlehaircolor=['Hair Color','Color de pelo','Cor de cabelo']
//-----------------------------------height--------------------------------------//
validationheiht=['Please select height','Por favor seleccione altura','Selecione a altura']
titleheight=['Height','Altura','Altura']
//-----------------------------------Relation status page--------------------------------------//
validationRelation=['Please select your relationship status','Seleccione su estado civil','Selecione o seu status de relacionamento']
titleRelation=['Relationship Status','estado civil','status de relacionamento']
singlerelation=['Single','Soltera','solteiro']
inarelationship=['In a Relationship','En una relación','Em uma relação']
 marriedrelationship=['married','casado','casada']
 //-----------------------------------ravourite tv show--------------------------------------//
 tittletvshow=['Favourite Tv Show','programa de televisión avourite','programa de TV avourite']
 entertvshow=['Enter Tv Show','Entrar en programa de televisión','Entrar no programa de TV']
 validationtvshow=['Please enter your favourite tv show','Ingresa tu programa de televisión favorito','Por favor, insira seu programa de TV favorito']
//-----------------------------------Favourite Book--------------------------------------//
tittlebook=['Favourite Book','Libro favorito','Livro favorito']
enterbook=['Enter Favourite Book','Ingresar libro favorito','Ingresar libro favorito']
validationbook=['Please enter your favourite book','Ingrese su libro favorito','Por favor, insira seu livro favorito']
//-----------------------------------Favourite Movie--------------------------------------//
tittlemovie=['Favourite Movie','Película favorita','Filme favorito']
entermovie=['Enter Favourite Movie','Ingresar película favorita','Entrar no filme favorito']
validationmovie=['Please enter your favourite movie','Ingresa tu película favorita','Por favor insira seu filme favorito']
//-----------------------------------Favourite music--------------------------------------//
tittlemusic=['Favourite Music','Música favorita','Música favorita']
entermusic=['Enter Favourite Music','Digite a música favorita','Digite a música favorita']
validationmusic=['Please enter your favourite music','Ingrese su música favorita','Por favor insira sua música favorita']
//---------------------------------tags screen page---------------------------------//
tittletagsname=['Tags','Etiquetas','Tag']
resettag=['Reset','Reiniciar','Redefinir']
headingtags=["Choose up to 6 tags! don't detlost under the clutter. show who you are","¡Elija hasta 6 etiquetas! no se pierda bajo el desorden. muestra quien eres","Escolha até 6 tags! não desanime sob a desordem. mostre quem você é"]
validationtags=['Please select tags',"Por favor seleccione etiquetas","Selecione as tags"]
validationtagslength=['Please choose up to 6 tags','Elija hasta 6 etiquetas','Escolha até 6 tags']
//---------------------------------Question screen page---------------------------------//
tittlequestion=['Question','Pregunta','Questão']
headingQuestion=['Answer upto 3 question, slide from the crowds and show who you are.','Responda hasta 3 preguntas, deslícese entre la multitud y demuestre quién es usted.','Responda até 3 perguntas, deslize da multidão e mostre quem você é.']
validationquestion=['Please select any question','Por favor seleccione cualquier pregunta','Selecione qualquer pergunta']
validationanwserquestion=['Please select  anwser of selected question','Seleccione una respuesta de la pregunta seleccionada','Selecione uma resposta da pergunta selecionada']
//---------------------------------change password page---------------------------------//
titlechangepassword=['Change Password','Cambia la contraseña','Alterar a senha']
enteroldpassword=['Old Password','Contraseña anterior','Senha Antiga']
enternewpassword=['New Password','Nueva contraseña','Nova Senha']
confirmpassword=['Confirm Password','confirmar Contraseña','Confirme a Senha']
Updatebtn=['Update','Actualizar','Atualizar']
validationoldpass=['Please enter old password','Ingrese la contraseña anterior','Por favor insira a senha antiga']
validataionnewpass=['Please enter new password','Ingrese nueva contraseña','Por favor insira uma nova senha']
validataionnewpasslength=['password length should be minimum 6 character','la longitud de la contraseña debe tener un mínimo de 6 caracteres','O comprimento da senha deve ter no mínimo 6 caracteres']
validataionconfirmpass=['Please enter confirm password','Por favor ingrese confirmar contraseña','Por favor digite a senha de confirmação']
validationnotmatchpass=['your password is not match','tu contraseña no coincide','sua senha não é igual']
//--------------------------------------change username----------------//
titlechangeusername=['Change Username','Cambie el nombre de usuario','Mudar nome de usuário']
headingchnageusername=['Warning: you can change user name once!','Advertencia: ¡puede cambiar el nombre de usuario una vez!','Aviso: você pode alterar o nome de usuário uma vez!']
enterusernamechange=['Enter Username','Introduzca su nombre de usuario','Insira nome de usuário']
validationusername=['Please enter username','Por favor ingrese el nombre de usuario','Por favor insira o nome de usuário']
//-------------------------------------------block user list---------------------//
tittleblockuser=['Block User','Bloquear usuario','Bloquear usuário']
//--------------------------------------------------tearms & conditionpage-----------------//
titleTermscondition=['Terms & Conditions','Términos y condiciones','termos e Condições']
titleprivacy=['Privacy Policies','Políticas de privacidad','Políticas de privacidade']
titleabout=['About','Acerca de','Sobre']
//---------------------------share app page---------------------------//
headdingshare=['I’ve shared a link with you to a great new App','Compartí un vínculo contigo a una nueva y excelente aplicación','Eu compartilhei um link com você para um ótimo aplicativo novo']
sharelinktitle=['CUPIDO app link','Enlace de la aplicación CUPIDO','Link do aplicativo CUPIDO']
//---------------------------home app page---------------------------//
storieshome=['Stories','Cuentos','Histórias']
mystoryhome=['My story','Mi historia','Minha história']   
viewall=['View all','Ver todo','Ver tudo']
titleexitapp=['Exip App','Exip aplicación','Exip App']
exitappmessage=['Do you want to exit app','¿Quieres salir de la aplicación?','Você quer sair do aplicativo']
//------------------------------------like page ---------------------------------//
titlelikepage=['Like','Me gusta','Gostar']
dislikestatus=['dislike your profile successful','no me gusta tu perfil exitoso','não gosto do seu perfil bem sucedido']
titlevisitorpage=['Visitor','Visitante','Visitante']
sentlikepagebtn=['Sent','Expedida','Enviei']
addbtnlike=['Add','Añadir','Adicionar']
//---------------------------inbox page-------------//
tittleinbox=['Inbox','Bandeja de entrada','Caixa de entrada']
//---------------------------view all home page-------------//
tittlepopularfirst=['Popular first','Popular primero','Popular primeiro']
//------------------------------filter page----------------------------//
titleFilter=['Filter','Filtro','Filtrar']
donefilter=['Done','Hecho','Feita']
Genderfilter=['Gender','Género','Gênero']
Resetfilter=['Reset','Reiniciar','Redefinir']
locationfilter=['Location','Ubicación','Localização']
kilometersfilter=['Kilometers','Kilómetros','Quilometros']
agefilter=['Age','Años','Era']
year=['year','año','ano']
Malefilter=['Male','Masculina','Masculina']
Femalefilter=['Female','Hembra','Fêmea']
Bothfilter=['Both','Ambas','Ambas']

//-----------------------chat page-------------------------------//
chattextinputmessage=['Message','Mensaje','mensagem']
chataction=['Action','Acción','Açao']
chatreport=['Report User','Reportar usuario','Reportar usuário']
chatclear=['Clear Chat','Vacie la conversacion','Limpar conversa']
chatcancel=['Cancel','Cancelar','Cancelar']
reportmessagepopup=['Are your sure you want to ? report','¿Estás seguro de que quieres? reporte','Tem certeza que quer? relatório']
chatclearpopup=['Are your sure you to ? clear chat','¿Estás seguro de que lo haces? Vacie la conversacion','Tem certeza que quer? limpar conversa']
//-----------------------Home detaile page-------------------------------//
homedetaileaboutme=['About me','Sobre mí','Sobre mim']
photohomedetaile=['Photo','Foto','foto']
stotyhomedetaile=['Story','Historia','História']
currentlocation=['Current location','Ubicación actual','Localização atual']
Tagshomedetaile=['Tags','Etiquetas','Tag']
verificationhomedetaile=['Verification','Verificación','Verificação']
Addfriedbtnhomedetaile=['Add as friend','Agregar como amiga','Adicionar como amigo']
Requesthomedetaile=['Request Sent','Solicitud enviada','Pedido Enviado']
Reportuserhomedetaile=['Report user','Reportar usuario','Reportar usuário']
blockuserhomedetaile=['Block user','Bloquear usuario','Bloquear usuário']
blockedhomedetaile=['Unblock','Obstruida','Bloqueada']
//--------------------------------------fullimageview-------------------------//
likesfullimge=['Likes','Gustos','Gosta']
closefullimage=['Close','Cerrar','Perto']
//-------------------------------------view story------------------------//
Reportviewstory=['Report story','Informe historia','Relatar história']
deleteviewstory=['delete story','eliminar historia','deletar história']
Cancelviewstory=['Cancel','Cancelar','Cancelar']
//--------------------------------------my story---------------------------//
titlemystory=['My Story','Mi historia','Minha história']
//--------------------------------------profile like section-----------------------//
titlepeoplelike=['PEOPLE','PERSONAS','PESSOAS']
titlephotolike=['PHOTO','FOTO','FOTO']
tiltestorylike=['STORIES','CUENTOS','HISTÓRIAS']
//----------------------friend page----------------------------//
titlefiends=['Friends','Amigas','Amigos']
headingfriend=['You have new friend requests','Tienes nuevas solicitudes de amistad','Você tem novos pedidos de amizade']
Friendsrequests=['Friends requests','Solicitudes de amigos','Pedidos de amigos']
friendaccept=['Accept','Aceptar','Aceitar']
//----------------------verification social page----------------------------//
titleverification=['Verification','Verificación','Verificação']
googleverification=['Google','Google','Google']
Verifiedverification=['Verified','Verificada','Verificada']
facebookverification=['Facebook','Facebook','Facebook']
phoneverification=['Phone','Teléfono','telefone']
//--------------------------------become vip------------------------------//
titlebecomevip=['Become Vip','Conviértete en Vip','Torne-se VIP']
buynoe=['BUY NOW','COMPRA AHORA','COMPRE AGORA']
validationbecomevip=['please select any plan','por favor seleccione cualquier plan','por favor selecione qualquer plano']
//-------------------------------Nitification page----------------------------------//
titlenotification=['Notification','']
clearallnotification=['Clear all','Limpiar todo','Limpar tudo']
confirmnotification=['Confirm']
messagenotification=['Do you want to delete notification']
Payment_successful=['Payment successful','Pago exitoso','Pagamento bem sucedido']
Payment_un_successful=['Payment unsuccessful','Pago fallida','Pagamento malsucedido']
//-------------------------------------------help/contact us-------------------//
titlehelpcontactus=['Help Contact Us','Ayuda  Contacto  Nosotros','Ajuda  Contato  Nós']
helpnametitle=['Name','Nombre','Nome']
helpemailtitle=['Email','Email','O email']
helpfeedbacktitle=['Feedback','Realimentación','Comentários']
helpvalidationname=['Please enter name','Por favor ingrese el nombre','Por favor insira o nome']
helpvalidationemail=['Please enter email','Por favor ingrese correo electrónico','Por favor insira o email']
hehelpvalidationemailvalid=['Please enter valid email','Por favor introduzca un correo electrónico válido','Por favor insira um email válido']
helpvalidationfeedback=['Please enter your feedback','Por favor ingrese sus comentarios','Por favor, insira seu feedback']
submitbutnhelp=['Submit','Enviar','Enviar']
validationbirtday=['Please select birthday','Por favor seleccione cumpleaños','Selecione aniversário']
//-------------------------------------------Reset password us-------------------//
resetvalidationpasword=['Please enter new password','Ingrese nueva contraseña','Por favor insira uma nova senha']
resetpasslenghtvali=['password length should be minimum 6 character','la longitud de la contraseña debe tener un mínimo de 6 caracteres','o comprimento da senha deve ter no mínimo 6 caracteres']
resettitle=['Reset Password','Restablecer la contraseña','Redefinir senha']
resetenterpass=['New Password','Nueva contraseña','Nova Senha']
resetbtn=['Reset','Reiniciar','Redefinir']
resetcontinuebtn=['Continue','Seguir','Continuar']
response_msg = ['Response', 'Respuesta','Resposta'];
	server_msg=['Connection Error','Error de conexión','Erro de conexão'];

	deactivate_msg=['Account deactived']

	usernotexit_msg=["User id does not exist"]
}
export const Lang_chg = new Language_provider();

const XmlParser = require("xml2json");
var http = require('http')
let config = require('../config');
console.log(config);

//let configData = require('./config.json');
//var config = JSON.parse(configData)

// set the correct options for the call.
var options = {
    host : config.host, 
    path : "/qcbin/api/authentication/sign-in",
    method: "GET",
    headers : {'Authorization': 'Basic '+ Buffer.from((config.alm_userName + ':' + config.alm_password)).toString('base64')}
};

// authenticating the user into ALM
ALMConnect(options, 'header','', function(status, data){
    if (status){
        cookies = data.headers["set-cookie"]
        //get the LWSSO_Cookie from the header. This is the session cookie which will be used in all callouts to ALM.
        if (cookies != undefined ) {
            
            // is-authenticated
            // 1. Lista de todos os domínios e projeto:
            //var jsonDomains = Get(cookies, "/qcbin/api/domains")
            Get(cookies, "/qcbin/api/domains?include-projects-info=y")
            //Get(cookies, "/qcbin/api/domains")

            // 2. Pesquisa de versão atrelada a uma sequência especifica:
            //Get(cookies, "/qcbin/rest/domains/ARQUITETURA_TESTE_INTEGRACAO/projects/CTAS_CONTAS/releases?query={user-template-01[2020-0589902-5-002]}")

            // 3. Lista dos ciclos:
            //Get(cookies, "/qcbin/rest/domains/ARQUITETURA_TESTE_INTEGRACAO/projects/CTAS_CONTAS/release-cycles")

            // 4. Lista de execuções de testes:
            //Get(cookies, "/qcbin/rest/domains/ARQUITETURA_TESTE_INTEGRACAO/projects/CTAS_CONTAS/test-instances")
                        
            // 5. Lista de Defeitos:
            //Get(cookies, "/qcbin/rest/domains/ARQUITETURA_TESTE_INTEGRACAO/projects/CTAS_CONTAS/defects")
            
            //INPUTS 

            var projectName = "CPOS_MANUTENCAO_CADASTRO_POSIT";
            var rotina = "CPOS";
            var nSequencia = "2019-0507722-5-004";
            var dominio = "ARQUITETURA_TESTE_INTEGRACAO";

            var URI_ALM_Releases = "/qcbin/rest/domains/" + dominio +"/projects/" + projectName + "/releases?query={user-template-01[" + nSequencia + "]}";
            var URI_ALM_Releases_Cycles = "/qcbin/rest/domains/" + dominio + "/projects/" + projectName + "/release-cycles?query={parent-id[1002]}";
            var URI_ALM_Test_Instances = "/qcbin/rest/domains/" + dominio + "/projects/" + projectName + "/test-instances?/query={assign-rcyc[1002]}";

            Get(cookies, URI_ALM_Releases, function(jsonData){
                var releases = jsonData
                
                    // Get(cookies, URI_ALM_Releases_Cycles,function(jsonData) {
                    //     var release_cycles = jsonData

                    //         Get(cookies, URI_ALM_Test_Instances, function(jsonData){
                    //             var test_instances = jsonData
                    //         })
                    // })

                    console.log(releases);
                    //console.log(releases_cycles);
                    //console.log(test_instances);
            })

            //console.log(response);

        }else{
            console.log('ERROR:  Unable to login, check your username/password/serverURL.');
        }
    } else {
        console.log('ERROR:  ' + JSON.stringify(data));
    }
});


        

function Get(LWSSO_Cookie, path){
    
    var XMLoutput='';
    var JSONoutput='';
    

    //set the correct options for the call.
    var options = {
        host : config.host, 
        path : path, 
        method: "GET",
        headers : {"Cookie":LWSSO_Cookie}
    };

    var request = http.request(options, function(res){
        res.setEncoding('utf8');
        
        var Body = "";

        res.on('data',function(chunk){
            XMLoutput+=chunk;
        });        

        res.on('end',function(){
            //console.log('XMLoutput: ' + XMLoutput);

            JSONoutput = XmlParser.toJson(XMLoutput);
            JSONoutput = JSON.parse(JSONoutput)

            console.log("");
            console.log('URI: '+ path);
            
            // console.log('XMLoutput:'); 
            // console.log(XMLoutput);  
            console.log('JSONoutput:');   
            console.log("");
            console.log(JSON.stringify(JSONoutput));     
             
        });

    });

    request.on('error',function(e){
        callback(false,e);
    });
    if(options.method=='POST' || options.method == 'PUT'){
        request.write(requestBody);
    }
    request.end();
}

function ALMConnect(opt, responseType, requestBody, callback){
 
    var request = http.request(opt, function(res){
        res.setEncoding('utf8');
        var XMLoutput='';
        res.on('data',function(chunk){
            XMLoutput+=chunk;
        });
        res.on('end',function(){
            if(responseType=='data'){
                callback(true,XMLoutput);
            }else {
                callback(true, res);
            }
        });
    });
    request.on('error',function(e){
        callback(false,e);
    });
    if(opt.method=='POST' || opt.method == 'PUT'){
        request.write(requestBody);
    }
    request.end();
}
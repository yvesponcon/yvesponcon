setwd("Documents/javascript/covid")
doc="donnees-hospitalieres-covid19-2020-11-08-19h00.csv"
coviddata=read.csv(paste(doc),sep  =";")
coviddataday=coviddata[which(coviddata$sexe==0 & coviddata$jour=="2020-03-18" ),c(1,4)]
write.csv(coviddataday,"covid1803",sep=",")






coviddatasex=coviddata[which(coviddata$sexe==0),c(1,4)]
coviddatasextotal=aggregate(coviddatasex$hosp, by=list(dep = coviddatasex$dep),sum)


write.csv(coviddatasextotal,"covidhosptotal",sep=",")

docker build -t hedleygois/multi-docker-course-client:latest -t hedleygois/multi-docker-course-client:$SHA -f ./client/Dockerfile ./client
docker build -t hedleygois/multi-docker-course-server:latest -t hedleygois/multi-docker-course-server:$SHA -f ./server/Dockerfile ./server
docker build -t hedleygois/multi-docker-course-worker:latest -t hedleygois/multi-docker-course-worker:$SHA -f ./worker/Dockerfile ./worker

docker push hedleygois/multi-docker-course-client:latest
docker push hedleygois/multi-docker-course-client:$SHA
docker push hedleygois/multi-docker-course-server:latest
docker push hedleygois/multi-docker-course-server:$SHA
docker push hedleygois/multi-docker-course-worker:latest
docker push hedleygois/multi-docker-course-worker:$SHA

kubectl apply -f k8s
kubectl set image deployments/client-deployment client=hedleygois/multi-docker-course-client:$SHA
kubectl set image deployments/server-deployment server=hedleygois/multi-docker-course-server:$SHA
kubectl set image deployments/worker-deployment worker=hedleygois/multi-docker-course-worker:$SHA
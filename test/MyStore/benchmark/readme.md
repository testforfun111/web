### С балансировкой:

C:\Users\testc> ab -n 1000 -c 100 http://localhost/api/v1/users
This is ApacheBench, Version 2.3 <$Revision: 1913912 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking localhost (be patient)
Completed 100 requests
Completed 200 requests
Completed 300 requests
Completed 400 requests
Completed 500 requests
Completed 600 requests
Completed 700 requests
Completed 800 requests
Completed 900 requests
Completed 1000 requests
Finished 1000 requests


Server Software:        ABC
Server Hostname:        localhost
Server Port:            80

Document Path:          /api/v1/users
Document Length:        1269 bytes

Concurrency Level:      100
Time taken for tests:   1.950 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      1404000 bytes
HTML transferred:       1269000 bytes
Requests per second:    512.86 [#/sec] (mean)
Time per request:       194.985 [ms] (mean)
Time per request:       1.950 [ms] (mean, across all concurrent requests)
Transfer rate:          703.18 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.4      0       3
Processing:    42  185  55.1    181     393
Waiting:       30  184  55.1    181     393
Total:         42  185  55.1    181     393

Percentage of the requests served within a certain time (ms)
  50%    181
  66%    206
  75%    226
  80%    238
  90%    257
  95%    272
  98%    305
  99%    313
 100%    393 (longest request)


### без балансировки:

 C:\Users\testc>ab -n 1000 -c 100 http://localhost/api/v1/users
This is ApacheBench, Version 2.3 <$Revision: 1913912 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking localhost (be patient)
Completed 100 requests
Completed 200 requests
Completed 300 requests
Completed 400 requests
Completed 500 requests
Completed 600 requests
Completed 700 requests
Completed 800 requests
Completed 900 requests
Completed 1000 requests
Finished 1000 requests


Server Software:        ABC
Server Hostname:        localhost
Server Port:            80

Document Path:          /api/v1/users
Document Length:        1097 bytes

Concurrency Level:      100
Time taken for tests:   1.705 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      1232000 bytes
HTML transferred:       1097000 bytes
Requests per second:    586.64 [#/sec] (mean)
Time per request:       170.462 [ms] (mean)
Time per request:       1.705 [ms] (mean, across all concurrent requests)
Transfer rate:          705.80 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.4      0       2
Processing:    26  164  32.1    164     271
Waiting:       17  163  32.2    163     271
Total:         26  164  32.1    164     271

Percentage of the requests served within a certain time (ms)
  50%    164
  66%    174
  75%    182
  80%    187
  90%    201
  95%    212
  98%    225
  99%    232
 100%    271 (longest request)
### С балансировкой:

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
Document Length:        1589 bytes

Concurrency Level:      100
Time taken for tests:   1.731 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      1724000 bytes
HTML transferred:       1589000 bytes
Requests per second:    577.72 [#/sec] (mean)
Time per request:       173.094 [ms] (mean)
Time per request:       1.731 [ms] (mean, across all concurrent requests)
Transfer rate:          972.65 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.4      0       3
Processing:    36  165  50.9    163     347
Waiting:       16  164  51.1    162     347
Total:         36  165  50.9    163     348

Percentage of the requests served within a certain time (ms)
  50%    163
  66%    176
  75%    186
  80%    196
  90%    223
  95%    265
  98%    295
  99%    322
 100%    348 (longest request)

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
Document Length:        1589 bytes

Concurrency Level:      100
Time taken for tests:   1.893 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      1724000 bytes
HTML transferred:       1589000 bytes
Requests per second:    528.25 [#/sec] (mean)
Time per request:       189.304 [ms] (mean)
Time per request:       1.893 [ms] (mean, across all concurrent requests)
Transfer rate:          889.36 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.3      0       3
Processing:    50  180  47.9    184     324
Waiting:       26  179  47.7    183     323
Total:         50  180  47.9    184     325

Percentage of the requests served within a certain time (ms)
  50%    184
  66%    207
  75%    216
  80%    222
  90%    240
  95%    252
  98%    262
  99%    274
 100%    325 (longest request)
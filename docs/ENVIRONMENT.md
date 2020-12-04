## CI, TEST and DEV commonalities

The `.env` file is commited into source control, as a common denominator for CI and Dev environments.<br/>
It is also loaded into the test process, so that the test environment can use the exact same variables used by docker-compose and the server.

Things like image versions amd ports to use in docker-compose belong in there.
This also enables using variables specified in `.env` within docker-compose yaml files.
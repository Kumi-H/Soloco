# 
FROM python:3.9

# 
WORKDIR /backend


COPY ./app/static /backend/app/static

# 
COPY ./requirements.txt /backend/requirements.txt

# 
RUN pip install --no-cache-dir --upgrade -r /backend/requirements.txt

#
RUN pip install pytest

# 
COPY ./app /backend/app

#
EXPOSE 8000

# 
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
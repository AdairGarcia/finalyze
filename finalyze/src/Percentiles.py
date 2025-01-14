import pandas as pd
import re

def analyze_transactions(file_path):
    try:
        # Leer el archivo Excel
        df = pd.read_excel(file_path, engine='openpyxl')

        # Lista de nombres comunes para la columna de montos
        possible_columns = ['Monto', 'Amount', 'Cargo', 'Cantidad', 'Charge', 'Transaction Amount', 'Importe', 'Importe cargos']

        # Encontrar la columna que coincide
        column_name = next((col for col in possible_columns if col in df.columns), None)

        if not column_name:
            return {
                'status': 'error',
                'message': 'No se encontró una columna relacionada con montos en el archivo.'
            }

        # Registrar los primeros datos de la columna seleccionada
        print(f"Columna detectada: {column_name}")
        print("Datos iniciales:")
        print(df[column_name].head())

        # Normalizar los valores de la columna de montos eliminando signos y caracteres extraños excepto el signo negativo
        df[column_name] = df[column_name].astype(str).str.replace(r'[\$,]', '', regex=True).str.strip()

        # Manejar valores con signos '+' o '-'
        df[column_name] = df[column_name].str.replace(r'^\+\s*', '', regex=True)  # Quitar '+' al inicio
        df[column_name] = df[column_name].str.replace(r'^-\s*', '-', regex=True)   # Preservar '-' al inicio

        # Convertir la columna de montos a numérico
        df[column_name] = pd.to_numeric(df[column_name], errors='coerce')

        # Registrar los datos después de la limpieza
        print("Datos después de limpieza y conversión:")
        print(df[column_name].head())

        # Filtrar filas con valores válidos en la columna de montos
        df = df.dropna(subset=[column_name])

        # Verificar si el DataFrame tiene datos después del filtrado
        if df.empty:
            print("El DataFrame está vacío después del filtrado.")
            return {
                'status': 'error',
                'message': 'El archivo no contiene datos válidos en la columna de montos después del filtrado.'
            }

        # Filtrar valores negativos para las métricas
        positive_df = df[df[column_name] >= 0]

        if positive_df.empty:
            print("No hay valores positivos para calcular métricas.")
            return {
                'status': 'error',
                'message': 'El archivo no contiene valores positivos en la columna de montos.'
            }

        # Ordenar los datos positivos
        positive_df = positive_df.sort_values(by=column_name)

        # Calcular métricas
        max_transaction = df.loc[df[column_name].idxmax()]
        min_transaction = positive_df.iloc[0]  # El menor valor positivo es el primero después de ordenar
        percentiles = {
            '25th': positive_df[column_name].quantile(0.25),
            '50th': positive_df[column_name].quantile(0.50),
            '75th': positive_df[column_name].quantile(0.75),
        }

        # Crear la respuesta
        result = {
            'max_transaction': {
                'index': int(max_transaction.name),
                'details': max_transaction.to_dict()
            },
            'min_transaction': {
                'index': int(min_transaction.name),
                'details': min_transaction.to_dict()
            },
            'percentiles': percentiles
        }

        return {
            'status': 'success',
            'data': result
        }

    except Exception as e:
        return {
            'status': 'error',
            'message': 'Error procesando el archivo.',
            'error': str(e)
        }

# Ejemplo de uso
if __name__ == "__main__":
    file_path = "EstadoDeCuentaRappi.xlsx"  # Cambia esto por la ruta de tu archivo Excel
    result = analyze_transactions(file_path)
    print(result)

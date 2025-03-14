import pytest
from ..services.code_analysis import CodeAnalysisService
from unittest.mock import patch, MagicMock

@pytest.fixture
def code_analysis_service():
    return CodeAnalysisService()

@pytest.mark.asyncio
async def test_analyze_code(code_analysis_service):
    test_code = """
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr
    """
    
    mock_response = MagicMock()
    mock_response.text = """
Time Complexity: O(n²)
Space Complexity: O(1)

This is a bubble sort implementation that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.

Optimization suggestions:
1. Add a flag to detect if the array is already sorted
2. Track the last swap position to reduce the number of comparisons
3. Consider using a more efficient sorting algorithm for large datasets
    """
    
    with patch.object(code_analysis_service.model, 'generate_content_async', return_value=mock_response):
        result = await code_analysis_service.analyze_code(test_code, 'python')
        
        assert 'complexity' in result
        assert 'explanation' in result
        assert 'optimization' in result
        assert 'O(n²)' in result['complexity']
        assert 'bubble sort' in result['explanation'].lower()
        assert 'optimization' in result['optimization'].lower()

@pytest.mark.asyncio
async def test_convert_code(code_analysis_service):
    test_code = """
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr
    """
    
    mock_response = MagicMock()
    mock_response.text = """
public class BubbleSort {
    public static int[] bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n-i-1; j++) {
                if (arr[j] > arr[j+1]) {
                    int temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
            }
        }
        return arr;
    }
}
    """
    
    with patch.object(code_analysis_service.model, 'generate_content_async', return_value=mock_response):
        result = await code_analysis_service.convert_code(test_code, 'python', 'java')
        
        assert isinstance(result, str)
        assert 'class BubbleSort' in result
        assert 'public static int[] bubbleSort' in result 